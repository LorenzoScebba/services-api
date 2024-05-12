import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceVersion } from '../serviceVersions/serviceVersion.entity';

export class ServiceBase {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;
}

@Entity()
export class Service extends ServiceBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ServiceVersion, (sv) => sv.service, {
    eager: true,
  })
  @JoinTable()
  versions: ServiceVersion[];
}
