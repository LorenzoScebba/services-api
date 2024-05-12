import { Service } from '../entities/services/service.entity';
import { v4 } from 'uuid';
import {
  EntityMetadata,
  EntityPropertyNotFoundError,
  ObjectLiteral,
} from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { EmbeddedMetadata } from 'typeorm/metadata/EmbeddedMetadata';

export const serviceFactory = () => {
  const service = new Service();
  service.id = v4();
  service.name = v4();
  service.description = v4();
  service.versions = [];
  return service;
};

export const throwEntityPropertyNotFoundError = () => {
  throw new EntityPropertyNotFoundError('', {
    '@instanceof': undefined,
    afterInsertListeners: [],
    afterLoadListeners: [],
    afterRecoverListeners: [],
    afterRemoveListeners: [],
    afterSoftRemoveListeners: [],
    afterUpdateListeners: [],
    allEmbeddeds: [],
    ancestorColumns: [],
    beforeInsertListeners: [],
    beforeRecoverListeners: [],
    beforeRemoveListeners: [],
    beforeSoftRemoveListeners: [],
    beforeUpdateListeners: [],
    checks: [],
    childEntityMetadatas: [],
    closureJunctionTable: undefined,
    columns: [],
    connection: undefined,
    descendantColumns: [],
    eagerRelations: [],
    embeddeds: [],
    exclusions: [],
    foreignKeys: [],
    generatedColumns: [],
    hasMultiplePrimaryKeys: false,
    hasNonNullableRelations: false,
    hasUUIDGeneratedColumns: false,
    indices: [],
    inheritanceTree: [],
    inverseColumns: [],
    isAlwaysUsingConstructor: false,
    isClosureJunction: false,
    isJunction: false,
    lazyRelations: [],
    listeners: [],
    manyToManyRelations: [],
    manyToOneRelations: [],
    name: '',
    nonVirtualColumns: [],
    oneToManyRelations: [],
    oneToOneRelations: [],
    ownColumns: [],
    ownIndices: [],
    ownListeners: [],
    ownRelations: [],
    ownUniques: [],
    ownerColumns: [],
    ownerManyToManyRelations: [],
    ownerOneToOneRelations: [],
    parentClosureEntityMetadata: undefined,
    parentEntityMetadata: undefined,
    primaryColumns: [],
    propertiesMap: undefined,
    relationCounts: [],
    relationIds: [],
    relations: [],
    relationsWithJoinColumns: [],
    synchronize: false,
    tableMetadataArgs: undefined,
    tableName: '',
    tableNameWithoutPrefix: '',
    tablePath: '',
    tableType: undefined,
    target: undefined,
    targetName: '',
    uniques: [],
    build(): void {},
    compareEntities(): boolean {
      return false;
    },
    create(): any {},
    createPropertiesMap(): { [p: string]: any } {
      return {};
    },
    ensureEntityIdMap(): ObjectLiteral {
      return undefined;
    },
    extractRelationValuesFromEntity(): [
      RelationMetadata,
      any,
      EntityMetadata,
    ][] {
      return [];
    },
    findColumnWithDatabaseName(): ColumnMetadata | undefined {
      return undefined;
    },
    findColumnWithPropertyName(): ColumnMetadata | undefined {
      return undefined;
    },
    findColumnWithPropertyPath(): ColumnMetadata | undefined {
      return undefined;
    },
    findColumnWithPropertyPathStrict(): ColumnMetadata | undefined {
      return undefined;
    },
    findColumnsWithPropertyPath(): ColumnMetadata[] {
      return [];
    },
    findEmbeddedWithPropertyPath(): EmbeddedMetadata | undefined {
      return undefined;
    },
    findInheritanceMetadata(): EntityMetadata {
      return undefined;
    },
    findRelationWithPropertyPath(): RelationMetadata | undefined {
      return undefined;
    },
    getEntityIdMap(): ObjectLiteral | undefined {
      return undefined;
    },
    getEntityIdMixedMap(): ObjectLiteral | undefined {
      return undefined;
    },
    getInsertionReturningColumns(): ColumnMetadata[] {
      return [];
    },
    hasAllPrimaryKeys(): boolean {
      return false;
    },
    hasColumnWithPropertyPath(): boolean {
      return false;
    },
    hasEmbeddedWithPropertyPath(): boolean {
      return false;
    },
    hasId(): boolean {
      return false;
    },
    hasRelationWithPropertyPath(): boolean {
      return false;
    },
    mapPropertyPathsToColumns(): ColumnMetadata[] {
      return [];
    },
    registerColumn(): void {},
  });
};
