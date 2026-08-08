import CategoryProjects from "../CategoryProjects";

export const revalidate = 60;

export default function Comercial() {
  return (
    <CategoryProjects
      type="Comercial"
      number="03"
      title={<>Comercial para <em>conectar.</em></>}
      description="Criamos espaços comerciais que unem funcionalidade, identidade de marca e experiência do usuário."
    />
  );
}
