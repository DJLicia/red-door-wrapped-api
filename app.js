"use strict";
// const exp = require("constants");
const express = require("express");

const fs = require("fs/promises")
const globby = require("globby");
// const { STATUS_CODES } = require("http");
const path = require("path");

const app = express();
app.use(express.static("public"));

const SERVER_ERR = "Something is wrong with the server, try again later!";
const DEBUG = true;

/**
 * GET /products
 * GET /products/:id
 * GET /:filters
 * GET /faq
 * 
 * POST /review
 * POST /feedback
 */

// load data
async function readJsonFile(filePath) {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function loadData() {
    try {
      const productsData = await fs.readFile('data/products.json', 'utf-8');
      const faqsData = await fs.readFile('data/faqs.json', 'utf-8');
      return {
        products: JSON.parse(productsData),
        faqs: JSON.parse(faqsData)
      };
    } catch (err) {
        res.statusCode(404).send(STATUS_ERR);
    }
  }

// from lect 18
app.get("/products", async(req, res) => {
    try {
    const productsData = await readJsonFile(productsPath);

    let products = productsData.products;

    // Sort products if a valid sort parameter is provided
    if (sort === "price") {
        products.sort((a, b) => a.price - b.price);
    } else if (sort === "popularity") {
        products.sort((a, b) => b.popularity - a.popularity);
    } else if (sort && sort !== "popularity") {
        return res.status(400).json({
            error: "Bad Request",
            message: "Invalid sort parameter. Must be 'price' or 'popularity'.",
        });
    }

} catch (err) {
    if (DEBUG) {
        console.error(err);
    }
    res.status(500).json({
        error: "Internal Server Error",
        message: SERVER_ERR,
    });
}
});

// GET single product endpt
app.get("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await loadData();
      const allProducts = [...data.products.categories.food, ...data.products.categories.drink];
      const product = allProducts.find(p => p.id === id);
  
      if (!product) {
        return res.status(404).json({
          error: "Not Found",
          message: `Merch with the ID ${id} not found.`
        });
      }
  
      res.json(product);
    } catch (err) {
      if (DEBUG) console.error(err);
      res.status(500).json({
        error: "Internal Server Error, try again later",
        message: SERVER_ERR_MSG
      });
    }
  });


app.get("/categories", async(req, res) => {
    try {
        let categories = await fs.readdir("categories");
        res.json(categories);
    } catch(err) {
        if (DEBUG) {
            console.log(err);
        }
        res.statusCode(500).send(STATUS_ERR);
    }
});


// FAQ endpoint
// Load FAQs data
app.get("/faq", async (req, res) => {
    try {
      const data = await loadData();
      res.json({ faqs: data.faqs });
    } catch (err) {
      if (DEBUG) console.error(err);
      res.status(500).json({
        error: "Internal Server Error, try again later...",
        message: SERVER_ERR
      });
    }
  });

app.post("/feedback", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const missingFields = [];

        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!message) missingFields.push('message');

        if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Missing required fields",
            missing: missingFields
        });
        }

        res.json({
        success: true,
        id: `fb-${Math.floor(Math.random() * 100000)}`,
        message: "Thank you for your feedback!"
        });
    } catch (err) {
        if (DEBUG) console.error(err);
        res.status(500).json({
        error: "Internal Server Error",
        message: "Unable to process feedback at this time"
        });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);