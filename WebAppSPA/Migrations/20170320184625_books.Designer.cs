using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using WebAppSPA.Models;

namespace WebAppSPA.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20170320184625_books")]
    partial class books
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAppSPA.Models.Author", b =>
                {
                    b.Property<int>("AuthorID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.HasKey("AuthorID");

                    b.ToTable("Author");
                });

            modelBuilder.Entity("WebAppSPA.Models.Book", b =>
                {
                    b.Property<int>("BookID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AuthorID");

                    b.Property<string>("Title");

                    b.HasKey("BookID");

                    b.HasIndex("AuthorID");

                    b.ToTable("Book");
                });

            modelBuilder.Entity("WebAppSPA.Models.Movie", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Genre");

                    b.Property<decimal>("Price");

                    b.Property<DateTime>("ReleaseDate");

                    b.Property<string>("Title");

                    b.HasKey("ID");

                    b.ToTable("Movie");
                });

            modelBuilder.Entity("WebAppSPA.Models.Phone", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("Price");

                    b.HasKey("Id");

                    b.ToTable("Phone");
                });

            modelBuilder.Entity("WebAppSPA.Models.Book", b =>
                {
                    b.HasOne("WebAppSPA.Models.Author", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
