const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { check, validationResult } = require("express-validator");
const { getConnection } = require("./helper");
const OPTIONS = {
    "definition": {
      "openapi": "3.0.0",
      "info": {
        "title": "Swagger Express API Reference",
        "version": "1.0.0",
        "description": "A Simple Express Swagger API",
        "termsOfService": "http://example.com/terms/",
        "contact": {
          "name": "aparnapothula3",
          "url": "https://github.com/aparnapothula3",
          "email": "apothul2@uncc.edu"
        }
      },
  
      "servers": [
        {
          "url": "http://134.122.113.50:3000/",
          "description": "Swagger Express Documentation"
        }
      ]
    },
    "apis": ["./*.js"]
  }
const PORT = process.env.PORT || 3000;
const app = express();
const specs = swaggerJsDoc(OPTIONS);

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *   schemas:
 *     listofitem:
 *       type: object
 *       properties:
 *         ITEMCODE:
 *           type: string
 *         ITEMNAME:
 *           type: string
 *         BATCHCODE:
 *           type: string
 *         CONAME:
 *           type: string
 */

/**
 * @swagger
 * /listofitem:
 *   post:
 *     summary: Insert a item
 *     tags: [listofitem]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ITEMCODE:
 *                    type: string
 *                    example: I007
 *                  ITEMNAME:
 *                    type: string
 *                    example: Gulab Jamun
 *                  BATCHCODE:
 *                    type: string
 *                    example: 2507
 *                  CONAME:
 *                    type: string
 *                    example: GJ
 *     responses:
 *       200:
 *         description: Succesfully inserted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not insert
 */
app.post("/listofitem", [
    check("ITEMCODE", "ITEMCODE must not be empty").isLength({
      min: 1,
    }),
    check("ITEMNAME", "ITEMNAME must not be empty").isLength({
      min: 1,
    }),
    check("BATCHCODE", "BATCHCODE must not be empty").isLength({
      min: 1,
    }),
    check("CONAME", "CONAME must not be empty").isLength({
      min: 1,
    }),
  ], (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("INSERT INTO listofitem (ITEMCODE, ITEMNAME, BATCHCODE, CONAME) VALUES (?,?,?,?);",
          [body.ITEMCODE, body.ITEMNAME, body.BATCHCODE, body.CONAME])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /listofitems:
 *   get:
 *     summary: Returns the list of items
 *     tags: [listofitem]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/listofitem'
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get items
 */
  app.get("/listofitems", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from listofitem")
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /listofitem:
 *   put:
 *     summary: Update a item
 *     tags: [listofitem]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ITEMNAME:
 *                    type: string
 *                    example: Apar
 *                  ITEMCODE:
 *                    type: number
 *                    example: I009
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */
app.put("/listofitem", [
    check("ITEMCODE", "ITEMCODE must not be empty").isLength({
      min: 1,
    }),
    check("ITEMNAME", "ITEMNAME must not be empty").isLength({
      min: 1,
    }),
  ],(req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE listofitem SET ITEMNAME = ? WHERE ITEMCODE = ?",
          [body.ITEMNAME,  body.ITEMCODE])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /listofitem:
 *   patch:
 *     summary: Update a item
 *     tags: [listofitem]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CONAME:
 *                    type: string
 *                    example: Cookie
 *                  ITEMCODE:
 *                    type: string
 *                    example: I005
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */
app.patch("/listofitem",[
    check("ITEMCODE", "ITEMCODE must not be empty").isLength({
      min: 1,
    }),
    check("CONAME", "CONAME must not be empty").isLength({
      min: 1,
    }),
  ],
 (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE listofitem SET CONAME = ? WHERE ITEMCODE = ?",
          [body.CONAME, body.ITEMCODE])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /listofitem/{id}:
 *   delete:
 *     summary: Deletes a item with specified id
 *     tags: [listofitem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 26
 *         required: true
 *         description: id that needs to be deleted
 *     responses:
 *       200:
 *         description: Succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not delete
 */

app.delete("/listofitem/:id",[
    check("id", "ITEMCODE must not be empty").isLength({
      min: 1,
    }),
  ], (req, res) => {
    let id = req.params.id;
    getConnection()
      .then((conn) => {
        conn
          .query("DELETE FROM listofitem WHERE ITEMCODE = ?",id)
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/orders", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from orders")
          .then((rows) => {
          conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/orders/:amt", (req, res) => {
    var amt = req.params.amt;
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from orders where ORD_AMOUNT = ?`, amt)
          .then((rows) => {
            conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/orders", (req, res) => {
    var sorting = req.query.sorting;
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from orders order by ORD_DESCRIPTION ${sorting})`)
          .then((rows) => {
            conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
