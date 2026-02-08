
import { log } from 'console';
import { readFileSync, writeFileSync } from 'fs';
export default {
   getProjects: (req, res) => {
      try {
         const projectsData = JSON.parse(readFileSync(new URL('../data/projects.json', import.meta.url)));

         res.status(200).json(projectsData);
      } catch (error) {
         res.status(400).JSON({ message: 'could not fetch project data', error: e })
      }
   },
   addNewProject: (req, res) => {

      const data = req.body;
      try {
         const projectsData = JSON.parse(readFileSync(new URL('../data/projects.json', import.meta.url)));
         projectsData.unshift({ id: projectsData.length + 1, ...data});
         console.log(projectsData);


         writeFileSync(
            new URL('../data/projects.json', import.meta.url),
            JSON.stringify(projectsData, null, 2),
            'utf-8'
         )
         res.status(200).json({ message: 'OK' })
      } catch (e) {
         res.status(400).json({ message: 'not OK', error: e })
      }
   },
   deleteProject: (req, res) => {
      try {
         const projectId = req.params.id;

         const projectsData = JSON.parse(readFileSync(new URL('../data/projects.json', import.meta.url)));

         const projectToDelete = projectsData.findIndex(p => p.id == projectId);


         projectsData.splice(projectToDelete, 1)
         writeFileSync(new URL('../data/projects.json', import.meta.url), JSON.stringify(projectsData, null, 2), 'utf-8');
         res.status(200).json({
            message: "deleted"
         })
      } catch (error) {
         res.status(400).json({ message: 'could not delete' })
      }
   },
   editProject: (req,res) =>{
      const projectId = req.params.id;
      console.log('projectId: ', projectId);
      
      const projectData = req.body
      console.log('project Data: ', projectData);
    
      const projects = JSON.parse(readFileSync(new URL('../data/projects.json', import.meta.url)))
      const projectToIdit = projects.findIndex(p=>p.id == projectId)
      projects[projectToIdit] = {projectId, ...projectData};

      writeFileSync(new URL('../data/projects.json', import.meta.url), JSON.stringify(projects, null,2), 'utf-8');

      res.status(200).json({message:'success eiditing the project'})
      
      
   }
}