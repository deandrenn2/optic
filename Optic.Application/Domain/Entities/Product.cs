using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;
public class Product : AggregateRoot
{
    public Product(int id, int idBrand, string name, string codeNumber, int quantity, decimal unitPrice, decimal salePrice, int stock) : base(id)
    {
        IdBrand = idBrand;
        Name = name;
        CodeNumber = codeNumber;
        Quantity = quantity;
        UnitPrice = unitPrice;
        SalePrice = salePrice;
        Stock = stock;
    }

    public Product(int id, int idBrand, string name, string codeNumber, int quantity, decimal unitPrice, decimal salePrice, int stock, string barCode) : base(id)
    {
        IdBrand = idBrand;
        Name = name;
        CodeNumber = codeNumber;
        Quantity = quantity;
        UnitPrice = unitPrice;
        SalePrice = salePrice;
        Stock = stock;
        BarCode = barCode;
    }

    public string Name { get; private set; }
    public int IdBrand { get; private set; }
    public string CodeNumber { get; private set; }
    public string? BarCode { get; private set; }
    public int Quantity { get; private set; }
    public decimal UnitPrice { get; private set; }
    public decimal SalePrice { get; private set; }
    public int Stock { get; private set; }
    public string? Image { get; private set; }
    public List<Category> Categories { get; private set; } = new();

    public static Product Create(int id, int idBrand, string name, string codeNumber, int quantity, decimal unitPrice, decimal salePrice, int stock)
    {
        return new Product(id, idBrand, name, codeNumber, quantity, unitPrice, salePrice, stock);
    }

    public void AddCategory(Category category)
    {
        Categories.Add(category);
    }

    public void Update(int idBrand, string name, string codeNumber, int quantity, decimal unitPrice, decimal salePrice, int stock, string? barCode, string? image)
    {
        IdBrand = idBrand;
        Name = name;
        CodeNumber = codeNumber;
        Quantity = quantity;
        UnitPrice = unitPrice;
        SalePrice = salePrice;
        Stock = stock;
        BarCode = barCode;
        Image = image;
    }
}


