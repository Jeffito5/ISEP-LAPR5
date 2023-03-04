namespace ArmazemApi.Domain.Shared
{
    /// <summary>
    /// Base class for entities.
    /// </summary>
    public abstract class Entity<TEntityId>
    where TEntityId: EntityId
    {
         public TEntityId Id { get;  protected set; }
         public Entity(TEntityId id){
            this.Id=id;
         }

         protected Entity(){}
    }
}