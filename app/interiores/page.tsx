import CategoryProjects from "../CategoryProjects";

export const revalidate = 60;

export default function Interiores() {
  return (
    <CategoryProjects
      type="Interiores"
      number="02"
      title={<>Interiores que <em>encantam.</em></>}
      description="Ambientes pensados para acolher, inspirar e traduzir a essência de quem vive cada espaço."
    />
  );
}
