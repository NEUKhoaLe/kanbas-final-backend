import * as dao from "./dao.js";
function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findModulesForCourseId(cid);
    res.json(modules);
  });
  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const newModule = await dao.createModule(cid, req.body);
    res.json(newModule);
  });
  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await dao.deleteModule(mid);
    res.sendStatus(200);
  });
  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await dao.updateModule(mid, req.body);
    res.sendStatus(204);
  });
}
export default ModuleRoutes;