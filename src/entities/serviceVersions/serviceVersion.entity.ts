import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from '../services/service.entity';

export class ServiceVersionBase {
  @Column()
  version: string;
}

@Entity()
export class ServiceVersion extends ServiceVersionBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Service, (svc) => svc.id)
  service: Service;
}
