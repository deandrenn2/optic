using Optic.Application.Domain.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optic.Application.Domain.Entities;

class Formulas : AggregateRoot
{
    public Formulas(int id,
        string description,
        DateTime date,
        string state,
        string typeLens,
        string typePay,
        decimal priceLens,
        decimal queryValue 
        ) : base(id)
    {
        Descriptions = description;
        Date = date;
        State = state;
        TypeLens = typeLens;
        TypePay = typePay; 
        PriceLens = priceLens;
        QueryValue = queryValue;

    }
    public string Descriptions  { get; private set; }  
    public DateTime Date { get; private set; } = DateTime.Now;
    public string State { get; private set; }
    public string TypeLens { get; private set; }
    public string TypePay { get; private set; }
    public decimal PriceLens { get;private set; }
    public decimal QueryValue { get; private set; }
    public Client Client { get; private set; }
    public int ClientId { get; private set; }

    public static Formulas Create(int id, string description, DateTime date, string state, string typeLens, string typePay, decimal priceLens, decimal queryValue)
    {
        return new Formulas(id, description, date, state, typeLens, typePay, priceLens, queryValue);
    }

    public void Update (string description, DateTime date, string state, string typeLens, string typePay, decimal priceLens, decimal queryvalue)
    {
        Descriptions = description;
        Date = date;
        State = state;
        TypeLens = typeLens;
        TypePay = typePay;
        PriceLens = priceLens;
        QueryValue = queryvalue;
    }
    
            
}

