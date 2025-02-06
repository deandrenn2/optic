using Optic.Application.Domain.Primitives;

namespace Optic.Application.Domain.Entities;

public class Formula : AggregateRoot
{
    public Formula(int id,
        string description,
        DateTime date,
        string state,
        decimal priceConsultation,
        decimal priceLens
        ) : base(id)
    {
        Description = description;
        Date = date;
        State = state;
        PriceLens = priceLens;
        PriceConsultation = priceConsultation;
    }

    public string? Description { get; private set; }
    public DateTime Date { get; private set; } = DateTime.Now;
    public string State { get; private set; }
    public decimal PriceLens { get; private set; }
    public decimal PriceConsultation { get; private set; }
    public Client Client { get; private set; }
    public int ClientId { get; private set; }
    public Business Business { get; private set; }
    public int BusinessId { get; private set; }
    public List<Tags> Tags { get; set; } = new();
    public List<FormulaDiagnosis> FormulaDiagnosis { get; set; } = new();
    public int? IdInvoice { get; set; }
    public Invoice Invoice { get; set; }


    public static Formula Create(int id, string description, DateTime date, string state, decimal priceConsultation, decimal? priceLens)
    {
        return new Formula(id, description, date, state, priceConsultation, priceLens ?? 0);
    }

    public void AddTag(Tags tags)
    {
        Tags.Add(tags);
    }

    public void AddDiagnosis(FormulaDiagnosis diagnosis)
    {
        FormulaDiagnosis.Add(diagnosis);
    }

    public void AddInvoice(Invoice invoice)
    {
        Invoice = invoice;
    }

    public void AddClient(int idClient)
    {
        ClientId = idClient;
    }

    public void AddBusiness(int idBusiness)
    {
        BusinessId = idBusiness;
    }

    public void Update(string description, DateTime date, string state, decimal priceLens)
    {
        Description = description;
        Date = date;
        State = state;
        PriceLens = priceLens;
    }
}

