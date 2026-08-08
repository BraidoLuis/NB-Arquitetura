import { expect, test } from "@playwright/test";

test.describe("Fluxos do portfólio", () => {
  test("carrega a página inicial corretamente", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/NB|Arquitetura/i);

    await expect(
      page.getByRole("heading", {
        name: /espaços que contam.*sua história/i,
      }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Interiores · Comercial · Externos",
      ),
    ).toBeVisible();
  });

  test("navega da home para a página Sobre", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("link", {
        name: /conheça nossa história/i,
      })
      .click();

    await expect(page).toHaveURL(/\/sobre$/);

    await expect(
      page.getByRole("heading", {
        name: /arquitetura com propósito/i,
      }),
    ).toBeVisible();
  });

  test("abre as páginas das categorias", async ({
    page,
  }) => {
    const categories = [
      {
        path: "/interiores",
        text: /interiores/i,
      },
      {
        path: "/comercial",
        text: /comercial/i,
      },
      {
        path: "/externos",
        text: /externos/i,
      },
      {
        path: "/design",
        text: /design/i,
      },
    ];

    for (const category of categories) {
      await page.goto(category.path);

      await expect(page).toHaveURL(
        new RegExp(`${category.path}$`),
      );

      await expect(page.locator("body")).toContainText(
        category.text,
      );
    }
  });

  test("abre a página de contato", async ({ page }) => {
    await page.goto("/contato");

    await expect(page).toHaveURL(/\/contato$/);

    const main = page.getByRole("main");

    await expect(
      main.getByRole("link", {
        name: /whatsapp/i,
      }),
    ).toBeVisible();

    await expect(
      main.getByRole("link", {
        name: /instagram/i,
      }),
    ).toBeVisible();
  });

  test("abre um projeto por meio de uma categoria", async ({
    page,
  }) => {
    await page.goto("/interiores");

    const projectLink = page
      .locator('a[href^="/projetos/"]')
      .first();

    await expect(projectLink).toBeVisible();

    const projectUrl =
      await projectLink.getAttribute("href");

    expect(projectUrl).toBeTruthy();

    await Promise.all([
      page.waitForURL(/\/projetos\/.+/, {
        timeout: 15_000,
      }),
      projectLink.click(),
    ]);

    if (projectUrl) {
      await expect(page).toHaveURL(
        new RegExp(
          `${escapeRegExp(projectUrl)}$`,
        ),
      );
    }

    await expect(page.locator("h1")).toBeVisible();

    await expect(
      page.locator(".project-gallery"),
    ).toBeVisible();
  });

  test("abre o lightbox ao clicar em uma imagem do projeto", async ({
    page,
  }) => {
    await page.goto("/interiores");

    const projectLink = page
      .locator('a[href^="/projetos/"]')
      .first();

    await expect(projectLink).toBeVisible();

    const projectUrl =
      await projectLink.getAttribute("href");

    expect(projectUrl).toBeTruthy();

    await Promise.all([
      page.waitForURL(/\/projetos\/.+/, {
        timeout: 15_000,
      }),
      projectLink.click(),
    ]);

    const projectImage = page
      .locator(".project-gallery img")
      .first();

    await expect(projectImage).toBeVisible();

    await projectImage.click();

    await expect(
      page.locator(".yarl__portal"),
    ).toBeVisible();
  });

  test("protege o painel administrativo de visitantes", async ({
    page,
  }) => {
    await page.goto("/admin");

    await expect(page).toHaveURL(/\/admin\/login/);

    await expect(
      page.locator('input[type="email"]'),
    ).toBeVisible();

    await expect(
      page.locator('input[type="password"]'),
    ).toBeVisible();
  });

  test("exibe página não encontrada para projeto inexistente", async ({
    page,
  }) => {
    const response = await page.goto(
      "/projetos/projeto-que-nao-existe",
    );

    expect(response?.status()).toBe(404);

    await expect(page.locator("body")).toContainText(
      /404|página não encontrada|não foi encontrada/i,
    );
  });

  test("fecha o lightbox ao pressionar Escape", async ({
    page,
  }) => {
    await page.goto("/interiores");

    const projectLink = page
      .locator('a[href^="/projetos/"]')
      .first();

    await expect(projectLink).toBeVisible();

    await Promise.all([
      page.waitForURL(/\/projetos\/.+/, {
        timeout: 15_000,
      }),
      projectLink.click(),
    ]);

    const projectImage = page
      .locator(".project-gallery img")
      .first();

    await expect(projectImage).toBeVisible();
    await projectImage.click();

    const lightbox = page.locator(".yarl__portal");

    await expect(lightbox).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(lightbox).not.toBeVisible();
  });

  test("link do WhatsApp possui endereço válido", async ({
    page,
  }) => {
    await page.goto("/contato");

    const whatsappLink = page
      .getByRole("main")
      .getByRole("link", {
        name: /whatsapp/i,
      });

    await expect(whatsappLink).toBeVisible();

    await expect(whatsappLink).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/5522998109553/,
    );

    await expect(whatsappLink).toHaveAttribute(
      "target",
      "_blank",
    );
  });
});

function escapeRegExp(value: string) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}