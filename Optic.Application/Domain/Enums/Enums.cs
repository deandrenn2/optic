namespace Optic.Application.Domain.Enums;

public enum Sex
{
    Male = 0,
    Famale = 1
}

public enum UserStatus
{
    Active = 1,
    Inactive = 2,
    Disabled = 3,
}

public enum RoleUser
{
    Advisor = 1,
    Admin = 2,
    Super = 3
}

public enum LevelSetting
{
    System = 1,
    User = 2
}


public enum InvoiceState
{
    Draft = 1,
    Credit = 2,
    Paid = 3,
    returning = 4,
    Canceled = 5
}

public enum FormulaState
{
    Draft = 1,
    Credit = 2,
    Paid = 3,
    returning = 4,
    Canceled = 5
}

public enum DataStateChange
{
    None = 0,
    Modified = 1,
    Created = 2,
    Deleted = 3

}

