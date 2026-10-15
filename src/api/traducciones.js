const ESTADOS = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' }

const ESPECIES = {
  Human: 'Humano',
  Alien: 'Alien',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  Disease: 'Enfermedad',
  'Mythological Creature': 'Criatura mitológica',
  unknown: 'Desconocida',
}

const GENEROS = {
  Male: 'Masculino',
  Female: 'Femenino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
}

export const traducirEstado = (valor) => ESTADOS[valor] ?? valor
export const traducirEspecie = (valor) => ESPECIES[valor] ?? valor
export const traducirGenero = (valor) => GENEROS[valor] ?? valor
