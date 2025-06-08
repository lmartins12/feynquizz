# FabAddButtonComponent

Botão flutuante reutilizável para ações de adicionar.

## Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `icone` | `string` | `'add'` | Nome do ícone Ionicons |
| `cor` | `string` | `'primary'` | Cor do botão |
| `posicao` | `'bottom' \| 'top'` | `'bottom'` | Posição vertical |
| `lado` | `'start' \| 'end' \| 'center'` | `'end'` | Posição horizontal |
| `disabled` | `boolean` | `false` | Desabilita o botão |

## Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `clicado` | `EventEmitter<void>` | Botão foi clicado |

## Exemplos de Uso

### Botão Padrão
```html
<app-fab-add-button (clicado)="adicionarItem()">
</app-fab-add-button>
```

### Personalizado
```html
<app-fab-add-button
  icone="create-outline"
  cor="secondary"
  posicao="top"
  lado="start"
  (clicado)="criarNovo()">
</app-fab-add-button>
```

### Desabilitado
```html
<app-fab-add-button
  [disabled]="!podeAdicionar"
  (clicado)="adicionarItem()">
</app-fab-add-button>
``` 