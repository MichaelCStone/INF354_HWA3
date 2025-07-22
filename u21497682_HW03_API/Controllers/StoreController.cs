using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {

        private readonly IRepository _repository;
        public StoreController(IRepository repository)
        {
            _repository = repository;
        }

 
        [HttpGet, Route("getProducts")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _repository.GetProducts();
                var productTypes = await _repository.GetProductTypes();
                var brands = await _repository.GetBrands();

                // Loop through product listing
                foreach (var item in products)
                {
                    //Sets the Product Type
                    var productTypeInDb = productTypes.Where(x => x.ProductTypeId == item.ProductTypeId).FirstOrDefault();              
                    ProductType productType = new ProductType();
                    productType.ProductTypeId = productTypeInDb.ProductTypeId;
                    productType.Name = productTypeInDb.Name;
                    productType.Description = productTypeInDb.Description;
                    productType.DateCreated = productTypeInDb.DateCreated;
                    productType.DateModified = productTypeInDb.DateModified;
                    productType.IsActive = productTypeInDb.IsActive;
                    productType.IsDeleted = productTypeInDb.IsDeleted;
                    item.ProductType = productType;


                    // Sets the Brand
                    var brandInDb = brands.Where(x => x.BrandId == item.BrandId).FirstOrDefault();
                    Brand brand = new Brand();
                    brand.BrandId = brandInDb.BrandId;
                    brand.Name = brandInDb.Name;
                    brand.Description = brandInDb.Description;
                    brand.DateCreated = brandInDb.DateCreated;
                    brand.DateModified = brandInDb.DateModified;
                    brand.IsActive = brandInDb.IsActive;
                    brand.IsDeleted = brandInDb.IsDeleted;
                    item.Brand = brand;

                }

                return Ok(products);
            }
            catch (Exception ex ) 
            { 
              return BadRequest(ex.Message);    
            }        
        }

        [HttpGet, Route("getProductTypes")]
        public async Task<IActionResult> GetProductTypes()
        {
            try
            {
                return Ok(await _repository.GetProductTypes());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("getBrands")]
        public async Task<IActionResult> GetBrands()
        {
            try
            {
                return Ok(await _repository.GetBrands());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route("addProduct")]
        public async Task<IActionResult> AddProduct([FromForm] IFormFile? file, [FromForm] ProductViewModel model)
        {
            try
            {

                string base64 = "";
                // Convert to base 64 image code 
                if (file != null && file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        await file.CopyToAsync(ms);
                        byte[] imageBytes = ms.ToArray();
                        string base64String = Convert.ToBase64String(imageBytes);
                        base64 = base64String;
                    }
                }

                // Create our Product 
                Product product = new Product();
                product.Price = model.price;
                product.Description = model.description;
                product.BrandId = model.brand;
                product.ProductTypeId = model.producttype;
                product.Name = model.name;
                product.DateCreated = DateTime.Now;
                product.IsActive = true;
                product.IsDeleted = false;
                product.Image = base64;
                await _repository.AddProduct(product);

                return Ok("Successfully Added Product");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet, Route("getProductCountByBrand")]
        public async Task<IActionResult> GetProductCountByBrand()
        {
            try
            {
                var products = await _repository.GetProducts();
                var brands = await _repository.GetBrands();

                var brandCounts = products
                    .GroupBy(p => p.BrandId)
                    .Select(g => new
                    {
                        BrandName = brands.FirstOrDefault(b => b.BrandId == g.Key)?.Name ?? "Unknown",
                        Count = g.Count()
                    })
                    .ToList();

                return Ok(brandCounts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("getProductCountByType")]
        public async Task<IActionResult> GetProductCountByType()
        {
            try
            {
                var products = await _repository.GetProducts();
                var productTypes = await _repository.GetProductTypes();

                var typeCounts = products
                    .GroupBy(p => p.ProductTypeId)
                    .Select(g => new
                    {
                        TypeName = productTypes.FirstOrDefault(pt => pt.ProductTypeId == g.Key)?.Name ?? "Unknown",
                        Count = g.Count()
                    })
                    .ToList();

                return Ok(typeCounts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("getTopExpensiveProducts")]
        public async Task<IActionResult> GetTopExpensiveProducts()
        {
            try
            {
                var products = await _repository.GetProducts();
                var productTypes = await _repository.GetProductTypes();
                var brands = await _repository.GetBrands();

                var topProducts = products
                    .OrderByDescending(p => p.Price)
                    .Take(10)
                    .Select(p => new
                    {
                        Name = p.Name,
                        Price = p.Price,
                        Brand = brands.FirstOrDefault(b => b.BrandId == p.BrandId)?.Name ?? "Unknown",
                        Type = productTypes.FirstOrDefault(pt => pt.ProductTypeId == p.ProductTypeId)?.Name ?? "Unknown",
                        Description = p.Description
                    })
                    .ToList();

                return Ok(topProducts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
