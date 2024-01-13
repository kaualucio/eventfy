import { slugify } from "./../utils/slugfy"

const { PrismaClient } = require("@prisma/client") 

const database = new PrismaClient()

async function main() {
  try {

    await database.type.createMany({
      data: [
        { 
          name: 'Acampamento, Viagem ou Retiro',
          slug: slugify('Acampamento, Viagem ou Retiro')
        },
        { 
          name: 'Atração',
          slug: slugify('Atração')
        },
        { 
          name: 'Aula, Treinamento ou Workshop',
          slug: slugify('Aula, Treinamento ou Workshop')
        },
        { 
          name: 'Concerto ou Show',
          slug: slugify('Concerto ou Show')
        },
        { 
          name: 'Conferência',
          slug: slugify('Conferência')
        },
        { 
          name: 'Convenção',
          slug: slugify('Convenção')
        },
        { 
          name: 'Excursão',
          slug: slugify('Excursão')
        },
        { 
          name: 'Feira Profissional ou Exposição',
          slug: slugify('Feira Profissional ou Exposição')
        },
        { 
          name: 'Festa ou Evento Social',
          slug: slugify('Festa ou Evento Social')
        },
        { 
          name: 'Festival ou Feira',
          slug: slugify('Festival ou Feira')
        },
        { 
          name: 'Jogo ou Competição',
          slug: slugify('Jogo ou Competição')
        },
        { 
          name: 'Outro',
          slug: slugify('Outro')
        },
      ]
    })

    await database.category.createMany({
      data: [
        { 
          name: 'Artes Dramáticas e Visuais',
          slug: slugify('Artes Dramáticas e Visuais')
        },
        { 
          name: 'Atividades Escolares',
          slug: slugify('Atividades Escolares')
        },
        { 
          name: 'Caridade e Causas',
          slug: slugify('Caridade e Causas')
        },
        { 
          name: 'Casa e Estilo de Vida',
          slug: slugify('Casa e Estilo de Vida')
        },
        { 
          name: 'Ciência e Tecnologia',
          slug: slugify('Ciência e Tecnologia')
        },
        { 
          name: 'Comidas e/ou Bebidas',
          slug: slugify('Comidas e Bebidas')
        },
        { 
          name: 'Comunidade e Cultura',
          slug: slugify('Comunidade e Cultura')
        },
        { 
          name: 'Esportes e Fitness',
          slug: slugify('Esportes e Fitness')
        },
        { 
          name: 'Familia e Educação',
          slug: slugify('Familia e Educação')
        },
        { 
          name: 'Feriados e Festas Tradicionais',
          slug: slugify('Feriados e Festas Tradicionais')
        },
        { 
          name: 'Filmes, Mídia e Entretenimento',
          slug: slugify('Filmes, Mídia e Entretenimento')
        },
        { 
          name: 'Governo e Político',
          slug: slugify('Governo e Político')
        },
        { 
          name: 'Moda e Beleza',
          slug: slugify('Moda e Beleza')
        },
        { 
          name: 'Música',
          slug: slugify('Música')
        },
        { 
          name: 'Negócios e Profissional',
          slug: slugify('Negócios e Profissional')
        },
        { 
          name: 'Religião e Espiritualidade',
          slug: slugify('Religião e Espiritualidade')
        },
      ]
    })

    console.log('Success')

  } catch (error) {
    console.log('Error seeding the database categories and type', error)
  } finally {
    await database.$disconnect();
  }
}

main()