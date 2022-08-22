const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
try {
  const catInfo = await Category.findAll({
    include: [{model: Product}],
  });
  res.status(200).json(catInfo);
} catch (error) {
  res.status(500).json(error);
}
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try {
    const catByID = await Category.findByPk(
      req.params.id, {
        include: [{model: Product}],
      }
    );
    if (!catByID){
      res.status(404).json({
        message: "No category by that ID"
      });
      return;
    }
    res.status(200).json(catByID);
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catInfo = await Category.create(req.body);
    res.status(200).json(catInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((updateCat)=> {
      res.json(updateCat);
    });
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
try {
  const delInfo = await Category.destroy({
    where: {
      id: req.params.id, 
    },
  });
  if (!delInfo){
    res.status(404).json ({
      message: "No Category found with that ID"
    });
    return;
  }
  res.status(200).json(delInfo);
} catch (error) {
  res.status(500).json(error);
}
});

module.exports = router;
