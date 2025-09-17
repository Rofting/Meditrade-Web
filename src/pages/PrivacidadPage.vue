<script setup lang="ts">
import { ref } from 'vue'

const BRAND_RED = '#E1353B'
const LAST_UPDATED = '15/09/2025' // cámbialo cuando actualices la política

// Referencia al área que convertiremos a PDF
const contentRef = ref<HTMLElement | null>(null)

function printPage() {
  window.print()
}

async function downloadPdf() {
  // Carga on-demand para no engordar el bundle inicial
  const { default: html2pdf } = await import('html2pdf.js')
  const el = contentRef.value
  if (!el) return

  const opt = {
    margin:       12,                    // mm
    filename:     'Politica-de-Privacidad-Meditrade.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['css', 'legacy'] },
  } as const

  // Ignora la toolbar con el atributo data-h2pdf-ignore
  await html2pdf().set(opt).from(el).save()
}
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Barra de acciones (no sale en impresión/PDF) -->
    <div class="print:hidden border-b border-neutral-200 bg-white">
      <div class="container-default flex flex-wrap items-center gap-3 py-3">
        <h1 class="mr-auto text-lg font-semibold">Privacidad</h1>
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
        <h2 class="text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Política de Privacidad</h2>
        <p class="mt-3 max-w-3xl text-neutral-700">
          Esta política explica cómo tratamos tus datos personales y qué derechos puedes ejercer.
        </p>
        <p class="mt-1 text-sm text-neutral-500">Última actualización: {{ LAST_UPDATED }}</p>
      </div>
    </section>

    <!-- Contenido imprimible/PDF -->
    <section class="container-default py-10">
      <div class="grid gap-10 lg:grid-cols-[280px_1fr]" ref="contentRef">
        <!-- Índice -->
        <nav class="lg:sticky lg:top-24 h-max rounded-2xl border border-neutral-200 bg-white p-4 print:hidden" data-h2pdf-ignore>
          <p class="text-sm font-semibold text-neutral-700">Contenido</p>
          <ol class="mt-3 space-y-2 text-sm">
            <li><a href="#intro"        class="hover:underline">Introducción</a></li>
            <li><a href="#responsable"  class="hover:underline">Responsable del tratamiento</a></li>
            <li><a href="#tratamientos" class="hover:underline">Tratamientos de datos</a></li>
            <li class="ml-4 text-neutral-600">
              <a href="#finalidades"    class="hover:underline">Finalidades</a>
            </li>
            <li class="ml-4 text-neutral-600">
              <a href="#legitimacion"   class="hover:underline">Legitimación</a>
            </li>
            <li class="ml-4 text-neutral-600">
              <a href="#destinatarios"  class="hover:underline">Destinatarios</a>
            </li>
            <li class="ml-4 text-neutral-600">
              <a href="#procedencia"    class="hover:underline">Procedencia</a>
            </li>
            <li class="ml-4 text-neutral-600">
              <a href="#conservacion"   class="hover:underline">Conservación</a>
            </li>
            <li><a href="#derechos"     class="hover:underline">Derechos</a></li>
            <li><a href="#seguridad"    class="hover:underline">Seguridad</a></li>
            <li><a href="#cookies"      class="hover:underline">Cookies</a></li>
            <li><a href="#contacto"     class="hover:underline">Contacto RGPD</a></li>
          </ol>
        </nav>

        <!-- Texto -->
        <article class="prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
          <section id="intro" class="scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Introducción</h3>
            <p>
              Esta Política de Privacidad se ha elaborado conforme a la normativa vigente, incluida la Ley Orgánica
              de protección de datos y el Reglamento (UE) 2016/679 (RGPD). Su objetivo es informarte sobre las
              finalidades del tratamiento, datos de contacto para el ejercicio de derechos, plazos de conservación y
              medidas de seguridad aplicables.
            </p>
          </section>

          <section id="responsable" class="mt-10 scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Responsable del tratamiento</h3>
            <p><strong>Meditrade del Ebro S.L.</strong></p>
            <p>
              Paseo de la Independencia, 8, 6º E · 50004 · Zaragoza (Zaragoza)<br>
              Email: <a href="mailto:meditrade@meditrade.es" class="underline">meditrade@meditrade.es</a>
            </p>
          </section>

          <section id="tratamientos" class="mt-10 scroll-mt-28">
            <h3 class="text-2xl font-bold">Tratamientos de datos</h3>
            <p>
              Solo solicitamos los datos estrictamente necesarios para atender tus solicitudes de forma leal, lícita y
              transparente. Los datos se recogen para fines determinados, explícitos y legítimos, y no se tratan de
              manera incompatible con dichos fines. Los datos serán adecuados, pertinentes, no excesivos y se
              mantendrán actualizados.
            </p>

            <h4 id="finalidades" class="mt-8 text-xl font-semibold">Finalidades</h4>
            <p>
              Responder y gestionar eficazmente las solicitudes realizadas (p. ej., formularios web o comunicaciones),
              así como otras finalidades informadas de forma específica en el punto de recogida de datos.
            </p>

            <h4 id="legitimacion" class="mt-8 text-xl font-semibold">Legitimación</h4>
            <p>
              Con carácter general, la base jurídica es tu <strong>consentimiento</strong> expreso. En su caso, también
              puede ser el cumplimiento de <strong>obligaciones legales</strong> o la <strong>ejecución de un contrato</strong>.
            </p>

            <h4 id="destinatarios" class="mt-8 text-xl font-semibold">Destinatarios</h4>
            <p>
              No cedemos datos a terceros salvo obligación legal o cuando sea necesario para prestar el servicio, en
              cuyo caso te informaremos adecuadamente.
            </p>

            <h4 id="procedencia" class="mt-8 text-xl font-semibold">Procedencia</h4>
            <p>
              Con carácter general, los datos se recaban directamente del interesado. Si procediesen de terceros, se te
              informará dentro de un plazo razonable y, como máximo, en un mes.
            </p>

            <h4 id="conservacion" class="mt-8 text-xl font-semibold">Plazos de conservación</h4>
            <p>
              Conservamos la información el tiempo necesario para cumplir la finalidad para la que fue recabada. Una vez
              cumplida, los datos se bloquean y se mantienen a disposición de las Administraciones Públicas, Jueces y
              Tribunales durante los plazos de prescripción de responsabilidades; posteriormente, se eliminarán.
            </p>
          </section>

          <section id="derechos" class="mt-10 scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Derechos de los interesados</h3>
            <ul class="list-disc pl-6">
              <li><strong>Acceso</strong>: conocer si tratamos tus datos y obtener información sobre el tratamiento.</li>
              <li><strong>Rectificación</strong>: corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión</strong>: solicitar la eliminación en los supuestos previstos por la normativa.</li>
              <li><strong>Oposición</strong>: oponerte a tratamientos basados en tu consentimiento.</li>
              <li><strong>Limitación</strong>: solicitar la limitación del tratamiento en los casos previstos.</li>
              <li><strong>Portabilidad</strong>: recibir tus datos en formato estructurado y transmitirlos a otro responsable cuando proceda.</li>
              <li><strong>Reclamación</strong> ante la autoridad de control competente.</li>
            </ul>
            <p class="mt-3">
              Para ejercerlos, dirígete por escrito a la dirección postal indicada o por email, indicando en el asunto
              el derecho que deseas ejercitar. Atenderemos tu solicitud dentro de los plazos legales.
            </p>
          </section>

          <section id="seguridad" class="mt-10 scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Medidas de seguridad</h3>
            <p>
              Aplicamos medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al
              riesgo (art. 32 RGPD), incluyendo, cuando proceda: confidencialidad, integridad y disponibilidad de los
              sistemas; capacidad de restauración; verificación periódica de la eficacia de los controles; y
              seudonimización/cifrado.
            </p>
          </section>

          <section id="cookies" class="mt-10 scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Política de cookies</h3>
            <p>
              Para información sobre cookies y tecnologías similares, consulta la <a href="/cookies" class="underline">
              Política de Cookies</a>.
            </p>
          </section>

          <section id="contacto" class="mt-10 scroll-mt-28 avoid-break">
            <h3 class="text-2xl font-bold">Contacto RGPD</h3>
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
/* Estilos de impresión A4 */
@page {
  size: A4;
  margin: 12mm;
}
@media print {
  /* Oculta todo lo marcado como print:hidden (Tailwind ya soporta el variante print) */
  .print\:hidden { display: none !important; }

  /* Quita sombras, bordes y fondos que estorben al imprimir */
  .prose, .container-default, article, section { box-shadow: none !important; }
  nav, .bg-neutral-50 { background: white !important; }

  /* Evita cortes feos dentro de bloques */
  .avoid-break { break-inside: avoid; }
}

/* Prose tweaks */
.prose :where(h3){margin-top:0.25rem;margin-bottom:0.75rem}
.prose :where(h4){margin-top:0.75rem;margin-bottom:0.5rem}
</style>
