import CategoryProjects from "../CategoryProjects";

export const revalidate = 60;

export default function Externos() {
  return (
    <CategoryProjects
      type="Externos"
      number="04"
      title={<>Externos que <em>integram paisagem.</em></>}
      description="Projetos que conectam arquitetura e natureza, valorizando o entorno e criando espaços ao ar livre com identidade."
    />
  );
}
