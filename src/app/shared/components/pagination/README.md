# PaginationComponent

Componente de paginação para listas com mais de 10 itens.

## Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `totalItens` | `number` | `0` | Total de itens na lista |
| `itensPorPagina` | `number` | `10` | Itens por página |
| `paginaAtual` | `number` | `1` | Página atual |

## Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `paginaAlterada` | `EventEmitter<number>` | Nova página selecionada |
| `infoPaginacao` | `EventEmitter<InfoPaginacao>` | Informações completas da paginação |

## Interface

```typescript
interface InfoPaginacao {
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  itensPorPagina: number;
}
```

## Exemplos de Uso

### Básico
```html
<app-pagination
  [totalItens]="topicos.length"
  [paginaAtual]="paginaAtual"
  (paginaAlterada)="mudarPagina($event)">
</app-pagination>
```

### Personalizado
```html
<app-pagination
  [totalItens]="150"
  [itensPorPagina]="20"
  [paginaAtual]="paginaAtual"
  (infoPaginacao)="atualizarInfo($event)">
</app-pagination>
```

```typescript
mudarPagina(pagina: number): void {
  this.paginaAtual = pagina;
  this.carregarItens();
}

atualizarInfo(info: InfoPaginacao): void {
  console.log(`Página ${info.paginaAtual} de ${info.totalPaginas}`);
}
``` 