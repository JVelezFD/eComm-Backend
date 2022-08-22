const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tagInfo = await Tag.findAll({
    // be sure to include its associated Product 
    include: [{model: Product}]
  });
  res.status(200).json(tagInfo);
  }catch (error) {
    res.status(500).json (error);
  }
  
});
 // find a single tag by its `id`
router.get('/:id', async (req, res) => {
 
  try {
    const tagInfoId = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }],
    });
    if(!tagInfoId) {
      res.status(404).json({message: "Tag not found with ID"});
      return; 
    }// be sure to include its associated Product data
    res.status(200).json(tagInfoId);
  }catch (error){
    res.status(500).json(error);
  }
  
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (error) {
    res.status(400).json(error);    
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateInfo = await Tag.update (
      req.body, {
        where: {
          id: req.params.id, 
        },
      }).then((updateInfo)=> {
      res.json(updateInfo);
  });
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delInfo = await Tag.destroy ({
      where: {
        id: req.params.id,
      },
    });
    if (!delInfo) {
      res.status(404).json({message: "tag has been deleted."});
      return;
    }
    res.status(200).json(delInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
