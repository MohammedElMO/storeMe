import express from "express";
import { ApiServer } from "../api/server-api.js";

import { validateSchema } from "../utils/genreValidator.js";
import { schemaCustomer } from "./schema/customer.js";
import { customerModel } from "../db/dbSchema/model-schema.js";
import isAuthentified from "../controllers/middlewares/authentification.js"
import isAdmin from "../controllers/middlewares/adminAuth.js"
const customerRoute = express.Router();

customerRoute.get("/", async (req, res) => {
  const customers = await ApiServer("customers", customerModel).getAll();
  res.send(customers);
});

customerRoute.post("/",isAuthentified, async (req, res) => {
  const error = validateSchema(req.body, schemaCustomer);
  if (error) return res.status(400).send(error.message);
  const postedCustomer = await ApiServer("customers", customerModel).post(
    req.body
  );
  console.log(req.body);
  console.log(postedCustomer);
  res.send(postedCustomer);
});

customerRoute.delete("/:id",isAdmin, async (req, res) => {
  const deletedCustomer = await ApiServer("customers", customerModel).delete(
    req.params.id
  );
  console.log(deletedCustomer);
  if (!deletedCustomer)
    return res.status(404).send("the geres with that id doesn't exist ");
  res.send(deletedCustomer);
});

customerRoute.put("/:id",isAuthentified, async (req, res) => {
  const isNotValidGenre = validateSchema(req.body, schemaCustomer);
  if (isNotValidGenre)
    return res.status(400).send(isNotValidGenre.details[0].message);
  const updatedCustomer = await ApiServer("customers", customerModel).update(
    req.params.id,
    req.query?.value
  );
  if (!updatedCustomer)
    return res.status(404).send("the genre with that id doesn't exist ");
  res.send(updatedCustomer);
});

customerRoute.get("/:id", async (req, res) => {
  const uniqueCustomer = await ApiServer("customers", customerModel).getUnique(
    req.params.id
  );
  console.log(uniqueCustomer);
  if (!uniqueCustomer)
    return res.status(404).send("the geres with that id doesn't exist ");
  res.send(uniqueCustomer);
});

export { customerRoute };
