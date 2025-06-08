# FilterBarComponent

Barra de filtros com busca e ordenação.

## Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `placeholder` | `string` | `'Buscar...'` | Placeholder do campo de busca |
| `opcoesOrdenacao` | `OpcaoOrdenacao[]` | `[]` | Opções de ordenação |
| `ordenacaoSelecionada` | `string` | `''` | Ordenação inicial |
| `valorBusca` | `string` | `''` | Valor inicial da busca |

## Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `buscaAlterada` | `EventEmitter<string>` | Termo de busca alterado |
| `ordenacaoAlterada` | `EventEmitter<string>` | Ordenação alterada |
| `filtroAplicado` | `EventEmitter<FiltroAplicado>` | Filtro completo aplicado |

## Interfaces

```typescript
interface OpcaoOrdenacao {
  valor: string;
  texto: string;
}

interface FiltroAplicado {
  busca: string;
  ordenacao: string;
}
```

## Exemplos de Uso

### Apenas Busca
```html
<app-filter-bar
  placeholder="Buscar tópicos..."
  (buscaAlterada)="filtrarPorBusca($event)">
</app-filter-bar>
```

### Com Ordenação
```html
<app-filter-bar
  placeholder="Buscar tópicos..."
  [opcoesOrdenacao]="opcoesOrdenacao"
  (filtroAplicado)="aplicarFiltros($event)">
</app-filter-bar>
```

```typescript
opcoesOrdenacao: OpcaoOrdenacao[] = [
  { valor: 'nome', texto: 'Nome' },
  { valor: 'data', texto: 'Data' },
  { valor: 'score', texto: 'Pontuação' }
];

aplicarFiltros(filtro: FiltroAplicado): void {
  // Aplicar busca e ordenação
}
``` 