import CategoryProjects from "../CategoryProjects";

export const revalidate = 60;

export default function Design() {
  return (
    <CategoryProjects
      type="Design"
      number="05"
      title={<>Detalhes que criam <em>identidade.</em></>}
      description="Do objeto à linguagem visual, o design completa a narrativa e transforma cada ponto de contato em experiência."
    />
  );
}
