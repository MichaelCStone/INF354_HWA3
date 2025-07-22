namespace Assignment3_Backend.Models
{
    public interface IRepository
    {
        Task<bool> SaveChangesAsync();
        void Add<T>(T entity) where T : class;
        Task<bool> AddProduct(Product product);
        Task<List<Product>> GetProducts();
        Task<List<ProductType>> GetProductTypes();
        Task<List<Brand>> GetBrands();
    
    }
}
