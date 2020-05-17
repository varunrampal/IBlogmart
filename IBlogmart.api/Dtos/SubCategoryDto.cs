namespace IBlogmart.api.Dtos
{
    public class SubCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public int CategoryId {get;set;}
    }
}