export interface ClientDTO {
  id?: string
  name: string
  cpf: string
  email: string
  password: string
  birthday: Date
  phone: string
  orders?: string[]
}
