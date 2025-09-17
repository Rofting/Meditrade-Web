<script setup lang="ts">
import { ref } from 'vue'

const BRAND_RED = '#E1353B'
const LAST_UPDATED = '15/09/2025' // actualízalo cuando cambies el texto

// Para generar PDF con html2pdf.js (carga on-demand)
const contentRef = ref<HTMLElement | null>(null)

function printPage() {
  window.print()
}

async function downloadPdf() {
  const { default: html2pdf } = await import('html2pdf.js')
  const el = contentRef.value
  if (!el) return

  await html2pdf()
      .set({
        margin: 12,
        filename: 'Aviso-Legal-Meditrade.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      })
      .from(el)
      .save()
}
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Toolbar (no aparece en impresión/PDF) -->
    <div class="print:hidden border-b border-neutral-200 bg-white">
      <div class="container-default flex flex-wrap items-center gap-3 py-3">
        <h1 class="mr-auto text-lg font-semibold">Aviso Legal</h1>
        <button
            type="button"
            class="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-50"
            @click="printPage"
            data-h2pdf-ignore
        >
          Imprimir
        </button>
        <button
            type="button"
            class="rounded-lg bg-[var(--brand-red)] px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
            @click="downloadPdf"
            data-h2pdf-ignore
        >
          Descargar PDF
        </button>
      </div>
    </div>

    <!-- Hero -->
    <section class="bg-neutral-50 print:bg-white">
      <div class="container-default py-12 md:py-16">
        <h2 class="text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Aviso Legal</h2>
        <p class="mt-3 max-w-3xl text-neutral-700">
          Condiciones de uso del sitio web, información del responsable y aspectos legales aplicables.
        </p>
        <p class="mt-1 text-sm text-neutral-500">Última actualización: {{ LAST_UPDATED }}</p>
      </div>
    </section>

    <!-- Contenido -->
    <section class="container-default py-10">
      <div class="grid gap-10 lg:grid-cols-[280px_1fr]" ref="contentRef">
        <!-- Índice (oculto al imprimir) -->
        <nav class="lg:sticky lg:top-24 h-max rounded-2xl border border-neutral-200 bg-white p-4 print:hidden" data-h2pdf-ignore>
          <p class="text-sm font-semibold text-neutral-700">Contenido</p>
          <ol class="mt-3 space-y-2 text-sm">
            <li><a href="#info"      class="hover:underline">Información general</a></li>
            <li><a href="#uso"       class="hover:underline">Condiciones de uso</a></li>
            <li><a href="#propiedad" class="hover:underline">Propiedad intelectual e industrial</a></li>
            <li><a href="#enlaces"   class="hover:underline">Enlaces</a></li>
            <li><a href="#responsab" class="hover:underline">Responsabilidad</a></li>
            <li><a href="#ley"       class="hover:underline">Legislación aplicable</a></li>
            <li><a href="#contacto"  class="hover:underline">Contacto legal</a></li>
          </ol>
        </nav>

        <!-- Texto -->
        <article class="prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
          <!-- Información general -->
          <section id="info" class="scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Información general</h3>
            <p>
              Titular del sitio web: <strong>Meditrade del Ebro S.L.</strong> (NIF <strong>B50837863</strong>)<br>
              Domicilio: Paseo de la Independencia, 8, 6º E · 50004 · Zaragoza (Zaragoza)<br>
              Sitio web: <span class="whitespace-nowrap">www.meditrade.es</span><br>
              Email de contacto: <a href="mailto:meditrade@meditrade.es" class="underline">meditrade@meditrade.es</a>
            </p>
            <p class="text-sm text-neutral-600">
              *Datos colegiales (si aplican): Colegio de Administradores de Fincas · Título de Administrador de Fincas ·
              Estado de expedición: España · Normativa profesional: normas del colegio.
            </p>
            <!-- Si en el futuro añades inscripción registral, colócala aquí -->
          </section>

          <!-- Condiciones de uso -->
          <section id="uso" class="mt-10 scroll-mt-28">
            <h3 class="text-2xl font-bold">Condiciones de uso</h3>
            <p>
              El acceso y la navegación por el sitio implican la aceptación de las presentes condiciones. El usuario se
              compromete a utilizar el sitio conforme a la ley, la buena fe y el orden público, absteniéndose de realizar
              usos ilícitos o que puedan causar perjuicio a terceros.
            </p>
          </section>

          <!-- Propiedad intelectual e industrial -->
          <section id="propiedad" class="mt-10 scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Propiedad intelectual e industrial</h3>
            <p>
              Los contenidos del sitio (diseños, textos, imágenes, logotipos, iconos, nombres comerciales, marcas, etc.)
              están protegidos por derechos de propiedad intelectual e industrial. No se autoriza su reproducción,
              transformación, distribución, comunicación pública o cualquier otra forma de explotación sin la
              correspondiente autorización del titular.
            </p>
            <p class="text-sm text-neutral-600">
              El usuario podrá utilizar la información facilitada para gestiones relacionadas con sus solicitudes y los
              datos de contacto correspondientes.
            </p>
          </section>

          <!-- Enlaces -->
          <section id="enlaces" class="mt-10 scroll-mt-28">
            <h3 class="text-2xl font-bold">Enlaces</h3>
            <p>
              No nos hacemos responsables de los contenidos, políticas o prácticas de sitios de terceros enlazados desde
              este sitio. El acceso a dichos sitios se realiza bajo la exclusiva responsabilidad del usuario y conforme a
              las condiciones de uso que rijan en los mismos.
            </p>
          </section>

          <!-- Responsabilidad -->
          <section id="responsab" class="mt-10 scroll-mt-28">
            <h3 class="text-2xl font-bold">Responsabilidad</h3>
            <p>
              Procuramos que la información sea exacta y esté actualizada; no obstante, no podemos garantizar la
              inexistencia de errores u omisiones. Nos reservamos el derecho a actualizar, modificar o eliminar los
              contenidos del sitio sin previo aviso. El uso del sitio se realiza bajo la responsabilidad del usuario.
            </p>
          </section>

          <!-- Ley aplicable y jurisdicción -->
          <section id="ley" class="mt-10 scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Legislación aplicable y jurisdicción</h3>
            <p>
              Estas condiciones se rigen por la legislación española. Salvo que la normativa aplicable disponga otra
              cosa, las partes se someten a los Juzgados y Tribunales de Zaragoza para cualquier controversia derivada
              del uso del sitio.
            </p>
          </section>

          <!-- Contacto legal -->
          <section id="contacto" class="mt-10 scroll-mt-28">
            <h3 class="text-2xl font-bold">Contacto legal</h3>
            <p>
              <strong>Meditrade del Ebro S.L.</strong><br>
              Paseo de la Independencia, 8, 6º E · 50004 · Zaragoza (Zaragoza)<br>
              Email: <a href="mailto:meditrade@meditrade.es" class="underline">meditrade@meditrade.es</a>
            </p>
          </section>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Impresión A4 */
@page { size: A4; margin: 12mm; }
@media print {
  .print\:hidden { display: none !important; }
  .prose, .container-default, article, section { box-shadow: none !important; }
  nav, .bg-neutral-50 { background: white !important; }
  .avoid-break { break-inside: avoid; }
}

/* Prose tweaks */
.prose :where(h3){margin-top:0.25rem;margin-bottom:0.75rem}
</style>
