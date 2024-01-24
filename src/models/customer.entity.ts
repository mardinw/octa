import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50})
  bank: string;

  @Column({length: 50})
  arco: string;
  
  @Column({length: 20})
  product: string;
  
  @Column({length: 16})
  card_number: string;

  @Column({length: 50})
  first_name: string;
  
  @Column({length: 100})
  last_name: string;

  @Column({length: 50})
  sex: string;

  @Column()
  dob: Date;

  @Column({length: 50})
  job_title: string;

  @Column({length: 100})
  business_phone: string;

  @Column({length: 50})
  home_phone: string;

  @Column({length: 50})
  mobile_phone: string;

  @Column({length: 50})
  econ_phone: string;

  @Column({length: 100})
  econ_name: string;

  @Column({length: 50})
  relation: string;

  @Column({length: 100})
  ibu: string;

  @Column({length: 100})
  home_address_1: string;

  @Column({length: 100})
  home_address_2: string;
  
  @Column({length: 100})
  home_address_3: string;

  @Column({length: 100})
  home_address_4: string;

  @Column({length: 100})
  home_city: string;

  @Column({length: 50})
  home_zip_code: string;

  @Column({length: 100})
  office_address_1: string;
  
  @Column({length: 100})
  office_address_2: string;
  
  @Column({length: 100})
  office_address_3: string;
  
  @Column({length: 100})
  office_address_4: string;

  @Column({length: 100})
  office_city: string;

  @Column({length: 50})
  office_zip_code: string;

  @Column({type: "decimal", precision: 19, scale: 2})
  current_balance: number;

  @Column({type: "decimal"})
  minimum_payment: number;

  @Column({type: "decimal"})
  credit_limit: number;

  @Column({type: "decimal"})
  interest: number;

  @Column({type: "decimal"})
  charge: number;

  @Column({type: "decimal"})
  last_payment_amount: number;

  @Column()
  last_payment_date: Date;

  @Column()
  open_date: Date;

  @Column()
  wo_date: Date;

  @Column()
  assignment_date: Date;

  @Column()
  expired_date: Date;

  @Column()
  assign_to_collector_date: Date;

  @Column()
  expired_collector_date: Date;

  @Column({length: 50})
  expired: string;

  @Column({length: 50})
  collector: string;

  @Column({length: 50})
  leader: string;

  @Column({length: 50})
  supervisor: string;

  @Column({length: 50})
  kacab: string;

  @Column({length: 50})
  cabang: string;

  @Column({length: 50})
  data_owner: string;

  @Column({length: 20})
  type_account: string;

  @Column({length: 20})
  action: string;

  @Column({type: "text"})
  description: string;

  @Column({length: 20})
  forecast: string;

  @Column({length: 20})
  priority: string;

  @Column({length: 10})
  is_ptp: string;

  @Column()
  ptp_date: Date;

  @Column({type: "decimal"})
  ptp_amount: number;

  @Column({type: "text"})
  permanent_messages: string;

  @Column({length: 100})
  concat_customer: string;
  
  getId(): number{
    return this.id;
  }
  
  getName(): string{
    return this.first_name;
  }
}

