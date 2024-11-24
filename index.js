import puppeteer from "puppeteer";

async function scrapeGoogle() {
  const browser = await puppeteer.launch({ headless: false });  // En modo no headless para depuración
  const page = await browser.newPage();

  await page.goto("https://google.com/");

  // Paso 2: Esperar que el campo de texto esté disponible
  await page.waitForSelector("textarea.gLFyf");

  // Paso 3: Escribir en el campo de texto
  await page.type("textarea.gLFyf", "texto para escribir");

  // Paso 4: Quitar el foco del input (hacer clic fuera del campo)
  await page.click('body');  // Hacemos clic en el <body> para quitar el foco del campo de búsqueda

  // Paso 5: Esperar a que el botón de búsqueda sea visible
  await page.waitForSelector('input[name="btnK"]', { visible: true });

  // Paso 6: Asegurarnos de que el botón sea clickeable (esperar hasta que sea realmente clickeable)
  await page.evaluate(() => {
    const button = document.querySelector('input[name="btnK"]');
    if (button && button.disabled) {
      throw new Error("El botón de búsqueda está deshabilitado.");
    }
  });

  // Paso 7: Hacer clic en el botón de búsqueda
  await page.click('input[name="btnK"]');

  // Paso 8: Esperar a que la página cargue los resultados (opcional)
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  // Paso 9: Tomar una captura de pantalla de la página
  await page.screenshot({ path: "pagina-completa.png" });

  // Paso 10: Cerrar el navegador
  await browser.close();
}

scrapeGoogle();
