import { describe, expect, it } from "vitest";
import {
  MAX_IMAGE_SIZE,
  slugify,
  storagePathFromUrl,
  validateProjectImage,
} from "../lib/project-utils";

describe("slugify", () => {
  it("converte o título para minúsculas", () => {
    expect(slugify("GLL Topografia")).toBe(
      "gll-topografia",
    );
  });

  it("remove acentos", () => {
    expect(slugify("Edifício Redondo")).toBe(
      "edificio-redondo",
    );
  });

  it("substitui barras e caracteres especiais", () => {
    expect(slugify("Casa C/L")).toBe("casa-c-l");
  });
});

describe("storagePathFromUrl", () => {
  it("extrai o caminho de uma imagem do Storage", () => {
    const url =
      "https://projeto.supabase.co/storage/v1/object/public/project-images/casa-rb/imagem.webp";

    expect(storagePathFromUrl(url)).toBe(
      "casa-rb/imagem.webp",
    );
  });

  it("ignora imagens locais", () => {
    expect(
      storagePathFromUrl("/images/casa-rb-1.jpeg"),
    ).toBeNull();
  });
});

describe("validateProjectImage", () => {
  it("aceita uma imagem válida", () => {
    expect(
      validateProjectImage({
        name: "projeto.webp",
        type: "image/webp",
        size: 800 * 1024,
      }),
    ).toBeNull();
  });

  it("aceita uma imagem com exatamente 1,5 MB", () => {
    expect(
      validateProjectImage({
        name: "imagem-limite.webp",
        type: "image/webp",
        size: MAX_IMAGE_SIZE,
      }),
    ).toBeNull();
  });

  it("rejeita uma imagem maior que 1,5 MB", () => {
    expect(
      validateProjectImage({
        name: "imagem-pesada.jpg",
        type: "image/jpeg",
        size: MAX_IMAGE_SIZE + 1,
      }),
    ).toContain("ultrapassa o limite");
  });

  it("rejeita uma imagem com um byte acima do limite", () => {
    expect(
      validateProjectImage({
        name: "imagem-acima-do-limite.webp",
        type: "image/webp",
        size: MAX_IMAGE_SIZE + 1,
      }),
    ).toContain("ultrapassa o limite");
  });

  it("rejeita tipos de arquivo não permitidos", () => {
    expect(
      validateProjectImage({
        name: "documento.pdf",
        type: "application/pdf",
        size: 500 * 1024,
      }),
    ).toContain("não é uma imagem válida");
  });
});