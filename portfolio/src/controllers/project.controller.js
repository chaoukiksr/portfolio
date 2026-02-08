import { readFileSync } from 'fs';
export default {
   getProjects: (req,res)=>{
      const projectsData = JSON.parse(readFileSync(new URL('../data/projects.json', import.meta.url)));
     console.log(projectsData);
     
      res.json(projectsData);
   }
}