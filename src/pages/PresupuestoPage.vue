<!-- src/pages/PresupuestoPage.vue -->
<script setup lang="ts">
import { reactive, ref, computed, defineComponent, h, watch } from 'vue'

/* ===========================
   Tipos y estado
=========================== */
type YesNo = 'si'|'no'|''
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
  calefaccion: YesNo
  agua: YesNo
  contadores: YesNo
  presion: YesNo
  piscina: YesNo
  instalaciones: YesNo
  videovigilancia: YesNo
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
  empleados: { porteros: 0, jardineros: 0, limpiadores: 0, conserjes: 0, socorristas: 0 },
  caracteristicas: { calefaccion: '', agua: '', contadores: '', presion: '', piscina: '', instalaciones: '', videovigilancia: '', otras: '' },
  anotaciones: '',
  preferencia: '',
  privacidad: false,
  website: '',
})

/* ===========================
   Validación por campo + touched
=========================== */
const touched = reactive(new Set<string>())
const errors  = reactive(new Map<string, string>())

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isYesNo = (v: YesNo) => v === 'si' || v === 'no'
const req = (v: any) => (v !== '' && v !== null && v !== undefined) ? null : 'Campo obligatorio'

function setErr(path: string, msg: string | null) {
  if (msg) errors.set(path, msg); else errors.delete(path)
}
function getErr(path: string) { return errors.get(path) }
function touch(path: string) { touched.add(path); validateField(path) }
const g = (path: string) => path.split('.').reduce((a: any, k) => a?.[k], form)

function validateField(path: string) {
  switch (path) {
    case 'comunidad.nombre': setErr(path, req(g(path))); break
    case 'comunidad.postal': {
      const v = String(g(path) ?? '')
      setErr(path, v.length === 5 ? null : 'Introduce 5 dígitos'); break
    }
    case 'comunidad.direccion': setErr(path, req(g(path))); break
    case 'comunidad.email': setErr(path, emailOk(g(path)) ? null : 'Email inválido'); break
    case 'comunidad.viviendas':
    case 'comunidad.garaje':
    case 'comunidad.ascensores': setErr(path, (g(path) ?? 0) >= 0 ? null : 'Número inválido'); break

    case 'solicitante.nombre': setErr(path, req(g(path))); break
    case 'solicitante.telefono1': {
      const v = String(g(path) ?? '').replace(/\D/g, '')
      setErr(path, v.length >= 9 ? null : 'Teléfono inválido'); break
    }
    case 'solicitante.email': setErr(path, emailOk(g(path)) ? null : 'Email inválido'); break
    case 'solicitante.cargo': setErr(path, req(g(path))); break

    case 'caracteristicas.calefaccion':
    case 'caracteristicas.agua':
    case 'caracteristicas.contadores':
    case 'caracteristicas.presion':
    case 'caracteristicas.piscina':
    case 'caracteristicas.instalaciones':
    case 'caracteristicas.videovigilancia':
      setErr(path, isYesNo(g(path)) ? null : 'Selecciona sí o no'); break

    case 'preferencia': setErr(path, req(g(path))); break
    case 'privacidad': setErr(path, g(path) ? null : 'Debes aceptar la privacidad'); break
  }
}

function validateStep(s: number) {
  const fieldsByStep: Record<number, string[]> = {
    1: ['comunidad.nombre','comunidad.postal','comunidad.direccion','comunidad.email','comunidad.viviendas','comunidad.garaje','comunidad.ascensores'],
    2: ['solicitante.nombre','solicitante.telefono1','solicitante.email','solicitante.cargo'],
    3: ['caracteristicas.calefaccion','caracteristicas.agua','caracteristicas.contadores','caracteristicas.presion','caracteristicas.piscina','caracteristicas.instalaciones','caracteristicas.videovigilancia'],
    4: ['preferencia','privacidad'],
  }
  fieldsByStep[s].forEach(p => touch(p))
  return fieldsByStep[s].every(p => !getErr(p))
}

/* ===========================
   Máscaras / normalización
=========================== */
function normalizePhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0,12)
  return d.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
}
function normalizeCP(v: string) {
  return v.replace(/\D/g, '').slice(0,5)
}
watch(() => form.solicitante.telefono1, (v) => {
  const n = normalizePhone(v); if (v !== n) form.solicitante.telefono1 = n
})
watch(() => form.solicitante.telefono2, (v) => {
  const n = normalizePhone(v || ''); if (v !== n) form.solicitante.telefono2 = n
})
watch(() => form.comunidad.postal, (v) => {
  const n = normalizeCP(v); if (v !== n) form.comunidad.postal = n
})

/* ===========================
   Wizard + envío
=========================== */
const step = ref(1)
const totalSteps = 4

const bannerMsg = ref<string>('')
const bannerType = ref<'ok'|'error'|'info'>('info')
const sending = ref(false)
const sent = ref(false)

function next() {
  if (!validateStep(step.value)) {
    bannerMsg.value = 'Revisa los campos marcados en rojo.'
    bannerType.value = 'error'
    return
  }
  bannerMsg.value = ''
  step.value = Math.min(step.value + 1, totalSteps)
}
function prev() { step.value = Math.max(step.value - 1, 1) }

async function submit() {
  // valida último paso también
  if (!validateStep(4)) {
    bannerMsg.value = 'Revisa los campos marcados en rojo.'
    bannerType.value = 'error'
    return
  }
  if (form.website) { sent.value = true; return } // honeypot

  sending.value = true
  bannerMsg.value = ''
  bannerType.value = 'info'
  try {
    const res = await fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('No se pudo enviar el presupuesto.')
    sent.value = true
    bannerMsg.value = '¡Enviado! Te hemos enviado un correo de confirmación.'
    bannerType.value = 'ok'
  } catch (e: any) {
    bannerMsg.value = e?.message ?? 'Error al enviar el formulario.'
    bannerType.value = 'error'
  } finally {
    sending.value = false
  }
}

const stepLabel = computed(() => ({
  1: 'Comunidad',
  2: 'Solicitante',
  3: 'Datos técnicos',
  4: 'Envío',
}[step.value]))

/* ===========================
   Subcomponentes (render con h)
=========================== */
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
        h('button', { type: 'button', class: 'h-9 w-9 rounded-lg border', onClick: dec, 'aria-label':'Disminuir' }, '-'),
        h('input', { value: String(props.modelValue), readonly: true, class: 'w-16 rounded-lg border px-3 py-2 text-center' }),
        h('button', { type: 'button', class: 'h-9 w-9 rounded-lg border', onClick: inc, 'aria-label':'Aumentar' }, '+'),
      ]),
    ])
  }
})

const YesNo = defineComponent({
  name: 'YesNo',
  props: {
    modelValue: { type: String, required: true },
    label: { type: String, required: true },
    path: { type: String, required: false },
    err: { type: String, required: false },
  },
  emits: ['update:modelValue','blur'],
  setup(props, { emit }) {
    const set = (v: 'si'|'no') => emit('update:modelValue', v)
    const onBlur = () => emit('blur')
    return () => h('div', null, [
      h('div', { class: 'text-sm font-medium' }, props.label),
      h('div', { class: 'mt-2 flex gap-3' }, [
        h('label', { class: 'inline-flex items-center gap-2 rounded-lg border px-3 py-2' }, [
          h('input', { type: 'radio', checked: props.modelValue === 'si', onChange: () => set('si'), onBlur }),
          h('span', null, 'Sí'),
        ]),
        h('label', { class: 'inline-flex items-center gap-2 rounded-lg border px-3 py-2' }, [
          h('input', { type: 'radio', checked: props.modelValue === 'no', onChange: () => set('no'), onBlur }),
          h('span', null, 'No'),
        ]),
      ]),
      props.err ? h('p', { class: 'mt-1 text-sm text-red-600', 'aria-live':'polite' }, props.err) : null
    ])
  }
})
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="bg-neutral-50">
      <div class="container-default py-12 md:py-16">
        <h1 class="h-title text-4xl md:text-5xl font-bold text-[var(--color-brand-600)]">Presupuesto</h1>
        <p class="mt-3 max-w-3xl text-neutral-700">
          Cada comunidad es distinta. Pide un presupuesto <strong>ajustado a tus necesidades</strong>,
          con nuestros valores: <strong>agilidad</strong>, <strong>servicio</strong> y <strong>transparencia</strong>.
        </p>
      </div>
    </section>

    <!-- Wizard -->
    <section class="container-default py-10">
      <!-- aria-live global para anuncios -->
      <div class="sr-only" aria-live="polite">{{ bannerMsg }}</div>

      <!-- Banner visible -->
      <p v-if="bannerMsg"
         :class="[
           'mb-4 rounded-lg px-3 py-2 text-sm',
           bannerType==='ok' ? 'bg-green-50 text-green-700' :
           bannerType==='error' ? 'bg-red-50 text-red-700' : 'bg-neutral-50 text-neutral-700'
         ]">
        {{ bannerMsg }}
      </p>

      <!-- Stepper -->
      <ol class="mb-8 grid gap-3 sm:grid-cols-4">
        <li v-for="n in totalSteps" :key="n" class="flex items-center gap-3">
          <span class="flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold"
                :class="n<=step ? 'border-[var(--color-brand-600)] text-[var(--color-brand-600)]' : 'border-[var(--color-border)] text-[var(--color-muted)]'">
            {{ n }}
          </span>
          <span class="text-sm" :class="n===step ? 'font-medium' : 'text-[var(--color-muted)]'">
            {{ ({1:'Comunidad',2:'Solicitante',3:'Datos técnicos',4:'Envío'})[n] }}
          </span>
        </li>
      </ol>

      <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <!-- Paso 1: Comunidad -->
        <div v-if="step===1" class="grid gap-4 md:grid-cols-2">
          <div>
            <label class="text-sm font-medium" for="c-nombre">Nombre*</label>
            <input id="c-nombre" v-model.trim="form.comunidad.nombre" @blur="touch('comunidad.nombre')"
                   :aria-invalid="!!getErr('comunidad.nombre')" :aria-describedby="'err-c-nombre'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('comunidad.nombre') && getErr('comunidad.nombre')" id="err-c-nombre" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('comunidad.nombre') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="c-postal">Código postal*</label>
            <input id="c-postal" v-model="form.comunidad.postal" @blur="touch('comunidad.postal')"
                   inputmode="numeric" maxlength="5"
                   :aria-invalid="!!getErr('comunidad.postal')" :aria-describedby="'err-c-postal'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('comunidad.postal') && getErr('comunidad.postal')" id="err-c-postal" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('comunidad.postal') }}</p>
          </div>

          <div class="md:col-span-2">
            <label class="text-sm font-medium" for="c-direccion">Dirección*</label>
            <input id="c-direccion" v-model.trim="form.comunidad.direccion" @blur="touch('comunidad.direccion')"
                   :aria-invalid="!!getErr('comunidad.direccion')" :aria-describedby="'err-c-dir'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('comunidad.direccion') && getErr('comunidad.direccion')" id="err-c-dir" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('comunidad.direccion') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="c-email">Email*</label>
            <input id="c-email" v-model.trim="form.comunidad.email" @blur="touch('comunidad.email')" type="email"
                   :aria-invalid="!!getErr('comunidad.email')" :aria-describedby="'err-c-email'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('comunidad.email') && getErr('comunidad.email')" id="err-c-email" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('comunidad.email') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="c-viv">Nº Viviendas/Locales*</label>
            <input id="c-viv" v-model.number="form.comunidad.viviendas" @blur="touch('comunidad.viviendas')" min="0" type="number"
                   :aria-invalid="!!getErr('comunidad.viviendas')" :aria-describedby="'err-c-viv'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('comunidad.viviendas') && getErr('comunidad.viviendas')" id="err-c-viv" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('comunidad.viviendas') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="c-gar">Nº Plazas Garaje*</label>
            <input id="c-gar" v-model.number="form.comunidad.garaje" @blur="touch('comunidad.garaje')" min="0" type="number"
                   :aria-invalid="!!getErr('comunidad.garaje')" :aria-describedby="'err-c-gar'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('comunidad.garaje') && getErr('comunidad.garaje')" id="err-c-gar" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('comunidad.garaje') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="c-asc">Nº Ascensores*</label>
            <input id="c-asc" v-model.number="form.comunidad.ascensores" @blur="touch('comunidad.ascensores')" min="0" type="number"
                   :aria-invalid="!!getErr('comunidad.ascensores')" :aria-describedby="'err-c-asc'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('comunidad.ascensores') && getErr('comunidad.ascensores')" id="err-c-asc" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('comunidad.ascensores') }}</p>
          </div>
        </div>

        <!-- Paso 2: Solicitante -->
        <div v-else-if="step===2" class="grid gap-4 md:grid-cols-2">
          <div class="md:col-span-2">
            <label class="text-sm font-medium" for="s-nombre">Nombre y apellidos*</label>
            <input id="s-nombre" v-model.trim="form.solicitante.nombre" @blur="touch('solicitante.nombre')"
                   :aria-invalid="!!getErr('solicitante.nombre')" :aria-describedby="'err-s-nombre'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('solicitante.nombre') && getErr('solicitante.nombre')" id="err-s-nombre" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('solicitante.nombre') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="s-tel1">Teléfono 1*</label>
            <input id="s-tel1" v-model="form.solicitante.telefono1" @blur="touch('solicitante.telefono1')" inputmode="tel" placeholder="600 000 000"
                   :aria-invalid="!!getErr('solicitante.telefono1')" :aria-describedby="'err-s-tel1'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('solicitante.telefono1') && getErr('solicitante.telefono1')" id="err-s-tel1" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('solicitante.telefono1') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="s-tel2">Teléfono 2</label>
            <input id="s-tel2" v-model="form.solicitante.telefono2" inputmode="tel" placeholder="Opcional" class="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>

          <div>
            <label class="text-sm font-medium" for="s-email">Email*</label>
            <input id="s-email" v-model.trim="form.solicitante.email" @blur="touch('solicitante.email')" type="email"
                   :aria-invalid="!!getErr('solicitante.email')" :aria-describedby="'err-s-email'"
                   class="mt-1 w-full rounded-lg border px-3 py-2" />
            <p v-if="touched.has('solicitante.email') && getErr('solicitante.email')" id="err-s-email" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('solicitante.email') }}</p>
          </div>

          <div>
            <label class="text-sm font-medium" for="s-cargo">Cargo*</label>
            <select id="s-cargo" v-model="form.solicitante.cargo" @blur="touch('solicitante.cargo')"
                    :aria-invalid="!!getErr('solicitante.cargo')" :aria-describedby="'err-s-cargo'"
                    class="mt-1 w-full rounded-lg border px-3 py-2">
              <option value="">Seleccione un cargo</option>
              <option value="presidente">Presidente</option>
              <option value="vicepresidente">Vicepresidente</option>
              <option value="comision">Comisión</option>
              <option value="propietario">Propietario</option>
            </select>
            <p v-if="touched.has('solicitante.cargo') && getErr('solicitante.cargo')" id="err-s-cargo" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('solicitante.cargo') }}</p>
          </div>
        </div>

        <!-- Paso 3: Empleados + Características -->
        <div v-else-if="step===3" class="grid gap-8">
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

          <div>
            <h3 class="text-lg font-semibold">Características</h3>
            <div class="mt-4 grid gap-6 md:grid-cols-2">
              <YesNo label="Calefacción central" v-model="form.caracteristicas.calefaccion" path="caracteristicas.calefaccion" :err="getErr('caracteristicas.calefaccion')" @blur="touch('caracteristicas.calefaccion')" />
              <YesNo label="Agua caliente central" v-model="form.caracteristicas.agua" path="caracteristicas.agua" :err="getErr('caracteristicas.agua')" @blur="touch('caracteristicas.agua')" />
              <YesNo label="Contadores individuales" v-model="form.caracteristicas.contadores" path="caracteristicas.contadores" :err="getErr('caracteristicas.contadores')" @blur="touch('caracteristicas.contadores')" />
              <YesNo label="Grupos de presión" v-model="form.caracteristicas.presion" path="caracteristicas.presion" :err="getErr('caracteristicas.presion')" @blur="touch('caracteristicas.presion')" />
              <YesNo label="Piscina" v-model="form.caracteristicas.piscina" path="caracteristicas.piscina" :err="getErr('caracteristicas.piscina')" @blur="touch('caracteristicas.piscina')" />
              <YesNo label="Instalaciones deportivas" v-model="form.caracteristicas.instalaciones" path="caracteristicas.instalaciones" :err="getErr('caracteristicas.instalaciones')" @blur="touch('caracteristicas.instalaciones')" />
              <YesNo label="Videovigilancia" v-model="form.caracteristicas.videovigilancia" path="caracteristicas.videovigilancia" :err="getErr('caracteristicas.videovigilancia')" @blur="touch('caracteristicas.videovigilancia')" />
              <div>
                <label class="text-sm font-medium">Otras</label>
                <input v-model.trim="form.caracteristicas.otras" class="mt-1 w-full rounded-lg border px-3 py-2" />
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 4: Envío -->
        <div v-else-if="step===4" class="grid gap-6">
          <div>
            <label class="text-sm font-medium" for="a-notas">Anotaciones</label>
            <textarea id="a-notas" v-model.trim="form.anotaciones" rows="5" class="mt-1 w-full rounded-lg border px-3 py-2"></textarea>
          </div>

          <div>
            <h3 class="text-lg font-semibold">¿Cómo deseas recibir el presupuesto?</h3>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
              <label class="inline-flex items-center gap-2 rounded-lg border px-3 py-2">
                <input type="radio" value="correo-ordinario" v-model="form.preferencia" @blur="touch('preferencia')" /> <span>Por correo ordinario</span>
              </label>
              <label class="inline-flex items-center gap-2 rounded-lg border px-3 py-2">
                <input type="radio" value="correo-electronico" v-model="form.preferencia" @blur="touch('preferencia')" /> <span>Por correo electrónico</span>
              </label>
              <label class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 sm:col-span-2">
                <input type="radio" value="cita-previa" v-model="form.preferencia" @blur="touch('preferencia')" /> <span>Solicitar cita previa en el despacho</span>
              </label>
            </div>
            <p v-if="touched.has('preferencia') && getErr('preferencia')" class="mt-1 text-sm text-red-600" aria-live="polite">{{ getErr('preferencia') }}</p>
          </div>

          <label class="mt-1 flex items-start gap-2 text-sm">
            <input v-model="form.privacidad" type="checkbox" required class="mt-1" @blur="touch('privacidad')">
            <span>He leído y acepto la <a href="/privacidad" class="underline">política de privacidad</a>.</span>
          </label>
          <p v-if="touched.has('privacidad') && getErr('privacidad')" class="text-sm text-red-600" aria-live="polite">{{ getErr('privacidad') }}</p>

          <!-- honeypot -->
          <input v-model="form.website" type="text" class="hidden" tabindex="-1" autocomplete="off" />
        </div>

        <!-- Navegación -->
        <div class="mt-6 flex items-center justify-between">
          <button v-if="step>1 && !sent" type="button" class="rounded-xl border px-4 py-2 text-sm" @click="prev">Atrás</button>

          <div class="ml-auto flex items-center gap-3">
            <button v-if="step<totalSteps && !sent" type="button" class="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90" @click="next">
              Siguiente: {{ stepLabel }}
            </button>

            <button v-else-if="!sent" type="button" class="rounded-xl bg-[var(--color-brand-600)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60" :disabled="sending" @click="submit">
              {{ sending ? 'Enviando…' : 'Enviar' }}
            </button>

            <span v-else class="text-green-700 text-sm font-medium" aria-live="polite">¡Enviado! Te contactaremos muy pronto.</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* todo con utilidades; sin CSS extra */
</style>
