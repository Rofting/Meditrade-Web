<script setup lang="ts">
import { reactive, ref, computed, defineComponent, h } from 'vue'

/** Marca */
const BRAND_RED = '#E1353B'

/** ----- Estado del formulario ----- */
type Comunidad = {
  nombre: string
  postal: string
  direccion: string
  email: string
  viviendas: number | null
  garaje: number | null
  ascensores: number | null
}
type Solicitante = {
  nombre: string
  telefono1: string
  telefono2?: string
  email: string
  cargo: 'presidente'|'vicepresidente'|'comision'|'propietario'|''
}
type Empleados = {
  porteros: number
  jardineros: number
  limpiadores: number
  conserjes: number
  socorristas: number
}
type Caracteristicas = {
  calefaccion: 'si'|'no'|''
  agua: 'si'|'no'|''
  contadores: 'si'|'no'|''
  presion: 'si'|'no'|''
  piscina: 'si'|'no'|''
  instalaciones: 'si'|'no'|''
  videovigilancia: 'si'|'no'|''
  otras?: string
}
type PreferenciaPresupuesto = 'correo-ordinario' | 'correo-electronico' | 'cita-previa' | ''
type FormData = {
  comunidad: Comunidad
  solicitante: Solicitante
  empleados: Empleados
  caracteristicas: Caracteristicas
  anotaciones?: string
  preferencia: PreferenciaPresupuesto
  privacidad: boolean
  website?: string // honeypot
}

const form = reactive<FormData>({
  comunidad: {
    nombre: '', postal: '', direccion: '', email: '',
    viviendas: null, garaje: null, ascensores: null,
  },
  solicitante: {
    nombre: '', telefono1: '', telefono2: '', email: '', cargo: '',
  },
  empleados: {
    porteros: 0, jardineros: 0, limpiadores: 0, conserjes: 0, socorristas: 0,
  },
  caracteristicas: {
    calefaccion: '', agua: '', contadores: '', presion: '',
    piscina: '', instalaciones: '', videovigilancia: '', otras: '',
  },
  anotaciones: '',
  preferencia: '',
  privacidad: false,
  website: '',
})

/** ----- Multistep ----- */
const step = ref(1)
const totalSteps = 4
function next() { if (validateStep(step.value)) step.value = Math.min(step.value + 1, totalSteps) }
function prev() { step.value = Math.max(step.value - 1, 1) }

/** ----- Validación ----- */
const err = ref<string | null>(null)
function emailOk(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }

function validateStep(s: number) {
  err.value = null
  if (s === 1) {
    const c = form.comunidad
    if (!c.nombre || !c.postal || !c.direccion || !emailOk(c.email) || !c.viviendas || !c.garaje || !c.ascensores) {
      err.value = 'Completa los datos de la comunidad (incluye email válido y números).'
      return false
    }
  }
  if (s === 2) {
    const a = form.solicitante
    if (!a.nombre || !a.telefono1 || !emailOk(a.email) || !a.cargo) {
      err.value = 'Completa los datos del solicitante y elige un cargo.'
      return false
    }
  }
  if (s === 3) {
    const k = form.caracteristicas
    if (!k.calefaccion || !k.agua || !k.contadores || !k.presion || !k.piscina || !k.instalaciones || !k.videovigilancia) {
      err.value = 'Responde a todas las características (sí/no).'
      return false
    }
  }
  if (s === 4) {
    if (!form.preferencia || !form.privacidad) {
      err.value = 'Elige cómo recibir el presupuesto y acepta la privacidad.'
      return false
    }
  }
  return true
}

/** ----- Envío ----- */
const sending = ref(false)
const sent = ref(false)
async function submit() {
  if (!validateStep(4)) return
  if (form.website) { sent.value = true; return } // honeypot
  sending.value = true
  err.value = null
  try {
    const res = await fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('No se pudo enviar el presupuesto')
    sent.value = true
  } catch (e: any) {
    err.value = e?.message ?? 'Error al enviar el formulario.'
  } finally {
    sending.value = false
  }
}

/** ----- Etiqueta del siguiente paso ----- */
const stepLabel = computed(() => ({
  1: 'Comunidad',
  2: 'Solicitante',
  3: 'Empleados y características',
  4: 'Anotaciones y envío',
}[step.value]))

/** ----- Subcomponentes sin JSX (render con h) ----- */
const Counter = defineComponent({
  name: 'Counter',
  props: { modelValue: { type: Number, required: true }, label: { type: String, required: true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inc = () => emit('update:modelValue', Math.max(0, (props.modelValue ?? 0) + 1))
    const dec = () => emit('update:modelValue', Math.max(0, (props.modelValue ?? 0) - 1))
    return () => h('div', { class: 'rounded-xl border p-4' }, [
      h('div', { class: 'text-sm font-medium' }, props.label),
      h('div', { class: 'mt-3 flex items-center gap-3' }, [
        h('button', { type: 'button', class: 'h-9 w-9 rounded-lg border', onClick: dec }, '-'),
        h('input', { value: String(props.modelValue), readonly: true, class: 'w-16 rounded-lg border px-3 py-2 text-center' }),
        h('button', { type: 'button', class: 'h-9 w-9 rounded-lg border', onClick: inc }, '+'),
      ]),
    ])
  }
})

const YesNo = defineComponent({
  name: 'YesNo',
  props: { modelValue: { type: String, required: true }, label: { type: String, required: true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const set = (v: 'si'|'no') => emit('update:modelValue', v)
    return () => h('div', null, [
      h('div', { class: 'text-sm font-medium' }, props.label),
      h('div', { class: 'mt-2 flex gap-3' }, [
        h('label', { class: 'inline-flex items-center gap-2 rounded-lg border px-3 py-2' }, [
          h('input', {
            type: 'radio',
            checked: props.modelValue === 'si',
            onChange: () => set('si'),
          }),
          h('span', null, 'Sí'),
        ]),
        h('label', { class: 'inline-flex items-center gap-2 rounded-lg border px-3 py-2' }, [
          h('input', {
            type: 'radio',
            checked: props.modelValue === 'no',
            onChange: () => set('no'),
          }),
          h('span', null, 'No'),
        ]),
      ]),
    ])
  }
})
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Hero -->
    <section class="bg-neutral-50">
      <div class="container-default py-12 md:py-16">
        <h1 class="h-title text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Presupuesto</h1>
        <p class="mt-3 max-w-3xl text-neutral-700">
          Cada comunidad es distinta. Pide un presupuesto <strong>ajustado a tus necesidades</strong>,
          con nuestros valores: <strong>agilidad</strong>, <strong>servicio</strong> y <strong>transparencia</strong>.
        </p>
      </div>
    </section>

    <!-- Wizard -->
    <section class="container-default py-10">
      <!-- Stepper -->
      <ol class="mb-8 grid gap-3 sm:grid-cols-4">
        <li v-for="n in totalSteps" :key="n" class="flex items-center gap-3">
          <span
              class="flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold"
              :class="n <= step ? 'border-[var(--brand-red)] text-[var(--brand-red)]' : 'border-neutral-300 text-neutral-400'"
          >{{ n }}</span>
          <span class="text-sm" :class="n === step ? 'font-medium' : 'text-neutral-500'">
            {{ n===1 ? 'Comunidad' : n===2 ? 'Solicitante' : n===3 ? 'Datos técnicos' : 'Envío' }}
          </span>
        </li>
      </ol>

      <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <!-- Mensaje de error -->
        <p v-if="err" class="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{{ err }}</p>

        <!-- Paso 1: Comunidad -->
        <div v-if="step===1" class="grid gap-4 md:grid-cols-2">
          <div>
            <label class="text-sm font-medium">Nombre*</label>
            <input v-model.trim="form.comunidad.nombre" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Código postal*</label>
            <input v-model.trim="form.comunidad.postal" inputmode="numeric" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div class="md:col-span-2">
            <label class="text-sm font-medium">Dirección*</label>
            <input v-model.trim="form.comunidad.direccion" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Email*</label>
            <input v-model.trim="form.comunidad.email" type="email" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Nº Viviendas/Locales*</label>
            <input v-model.number="form.comunidad.viviendas" type="number" min="0" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Nº Plazas Garaje*</label>
            <input v-model.number="form.comunidad.garaje" type="number" min="0" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Nº Ascensores*</label>
            <input v-model.number="form.comunidad.ascensores" type="number" min="0" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>

        <!-- Paso 2: Solicitante -->
        <div v-else-if="step===2" class="grid gap-4 md:grid-cols-2">
          <div class="md:col-span-2">
            <label class="text-sm font-medium">Nombre y apellidos*</label>
            <input v-model.trim="form.solicitante.nombre" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Teléfono 1*</label>
            <input v-model.trim="form.solicitante.telefono1" inputmode="tel" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Teléfono 2</label>
            <input v-model.trim="form.solicitante.telefono2" inputmode="tel" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Email*</label>
            <input v-model.trim="form.solicitante.email" type="email" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium">Cargo*</label>
            <select v-model="form.solicitante.cargo" class="mt-1 w-full rounded-lg border px-3 py-2">
              <option value="">Seleccione un cargo</option>
              <option value="presidente">Presidente</option>
              <option value="vicepresidente">Vicepresidente</option>
              <option value="comision">Comisión</option>
              <option value="propietario">Propietario</option>
            </select>
          </div>
        </div>

        <!-- Paso 3: Empleados + Características -->
        <div v-else-if="step===3" class="grid gap-8">
          <!-- Empleados -->
          <div>
            <h3 class="text-lg font-semibold">Empleados en nómina</h3>
            <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Counter label="Porteros" v-model="form.empleados.porteros" />
              <Counter label="Jardineros" v-model="form.empleados.jardineros" />
              <Counter label="Limpiadores" v-model="form.empleados.limpiadores" />
              <Counter label="Conserjes" v-model="form.empleados.conserjes" />
              <Counter label="Socorristas" v-model="form.empleados.socorristas" />
            </div>
          </div>

          <!-- Características (sí/no) -->
          <div>
            <h3 class="text-lg font-semibold">Características</h3>
            <div class="mt-4 grid gap-6 md:grid-cols-2">
              <YesNo label="Calefacción central" v-model="form.caracteristicas.calefaccion" />
              <YesNo label="Agua caliente central" v-model="form.caracteristicas.agua" />
              <YesNo label="Contadores individuales" v-model="form.caracteristicas.contadores" />
              <YesNo label="Grupos de presión" v-model="form.caracteristicas.presion" />
              <YesNo label="Piscina" v-model="form.caracteristicas.piscina" />
              <YesNo label="Instalaciones deportivas" v-model="form.caracteristicas.instalaciones" />
              <YesNo label="Videovigilancia" v-model="form.caracteristicas.videovigilancia" />
              <div>
                <label class="text-sm font-medium">Otras</label>
                <input v-model.trim="form.caracteristicas.otras" class="mt-1 w-full rounded-lg border px-3 py-2" />
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 4: Anotaciones + Preferencia + Privacidad -->
        <div v-else-if="step===4" class="grid gap-6">
          <div>
            <label class="text-sm font-medium">Anotaciones</label>
            <textarea v-model.trim="form.anotaciones" rows="5" class="mt-1 w-full rounded-lg border px-3 py-2"></textarea>
          </div>

          <div>
            <h3 class="text-lg font-semibold">¿Cómo deseas recibir el presupuesto?</h3>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
              <label class="inline-flex items-center gap-2 rounded-lg border px-3 py-2">
                <input type="radio" value="correo-ordinario" v-model="form.preferencia" /> <span>Por correo ordinario</span>
              </label>
              <label class="inline-flex items-center gap-2 rounded-lg border px-3 py-2">
                <input type="radio" value="correo-electronico" v-model="form.preferencia" /> <span>Por correo electrónico</span>
              </label>
              <label class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 sm:col-span-2">
                <input type="radio" value="cita-previa" v-model="form.preferencia" /> <span>Solicitar cita previa en el despacho</span>
              </label>
            </div>
          </div>

          <label class="mt-1 flex items-start gap-2 text-sm">
            <input v-model="form.privacidad" type="checkbox" required class="mt-1">
            <span>He leído y acepto la <a href="/privacidad" class="underline">política de privacidad</a>.</span>
          </label>

          <!-- honeypot -->
          <input v-model="form.website" type="text" class="hidden" tabindex="-1" autocomplete="off" />
        </div>

        <!-- Navegación -->
        <div class="mt-6 flex items-center justify-between">
          <button
              v-if="step>1 && !sent"
              type="button"
              class="rounded-xl border px-4 py-2 text-sm"
              @click="prev"
          >Atrás</button>

          <div class="ml-auto flex items-center gap-3">
            <button
                v-if="step<totalSteps && !sent"
                type="button"
                class="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                @click="next"
            >Siguiente: {{ stepLabel }}</button>

            <button
                v-else-if="!sent"
                type="button"
                class="rounded-xl bg-[var(--brand-red)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                :disabled="sending"
                @click="submit"
            >{{ sending ? 'Enviando…' : 'Enviar' }}</button>

            <span v-else class="text-green-700 text-sm font-medium">¡Enviado! Te contactaremos muy pronto.</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* sin css extra; todo con utilidades */
</style>

