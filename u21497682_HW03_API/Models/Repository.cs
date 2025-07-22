using Microsoft.EntityFrameworkCore;

namespace Assignment3_Backend.Models
{
    public class Repository:IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }


        public async Task<bool> AddProduct(Product product)
        {
            await _appDbContext.Products.AddAsync(product);
            await _appDbContext.SaveChangesAsync(); 
            return true;
        }


        public async Task<List<Product>> GetProducts()
        {
            var data = await _appDbContext.Products.ToListAsync();
            return data;
        }

        public async Task<List<ProductType>> GetProductTypes()
        {
            return await _appDbContext.ProductTypes.ToListAsync();
        }

        public async Task<List<Brand>> GetBrands()
        {
            return await _appDbContext.Brands.ToListAsync();
        }
    }
}
