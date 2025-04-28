// import CreateExperienceForm from "./CreateExperienceForm";
// export default function ExperiencePage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <CreateExperienceForm />
//     </div>
//   );
// }
// app/experience/page.jsx (Энэ нь урьдчилан үзэх хуудсанд холбогдох)

import ExperienceList from "@/app/experience/ExperienceList";
import CreateExperienceForm from "./CreateExperienceForm";

export default function ExperiencePage() {
  return (
    <div>
      <h1>All Experiences</h1>
      <CreateExperienceForm/>
      <ExperienceList /> 
    </div>
  );
}
