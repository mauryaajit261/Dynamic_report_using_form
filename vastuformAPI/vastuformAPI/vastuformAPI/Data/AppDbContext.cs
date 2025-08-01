using Microsoft.EntityFrameworkCore;
using vastuformAPI.Model;

namespace vastuformAPI.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Consultation> Consultations { get; set; }

        public DbSet<VastuEnergy> VastuEnergytb { get; set; }

        public DbSet<VastuVisit> VastuVisits { get; set; }

        public DbSet<TaskImage> TaskImages { get; set; }

        public DbSet<FamilyMember> FamilyMembers { get; set; }


        public DbSet<VastuVisit2> VastuVisits2 { get; set; }
        public DbSet<FamilyMember1> FamilyMembers1 { get; set; }
        public DbSet<ToiletDirection> ToiletDirections { get; set; }
        public DbSet<LechtareAntenaReading> LechtareAntenaReadings { get; set; }
        public DbSet<MicroEnergies> MicroEnergies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VastuVisit2>()
                .HasMany(v => v.FamilyMembers)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VastuVisit2>()
                .HasMany(v => v.Toilets)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VastuVisit2>()
                .HasMany(v => v.LechtareAntenaReadings)
                .WithOne(r => r.VastuVisit2)
                .HasForeignKey(r => r.VastuVisitId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VastuVisit2>()
                .OwnsOne(v => v.MicroEnergies); // embedded object
        }
    }
}
