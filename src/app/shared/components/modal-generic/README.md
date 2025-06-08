# ModalGenericComponent

Modal reutilizável para alertas e confirmações.

## Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `titulo` | `string` | `''` | Título do modal |
| `mensagem` | `string` | `''` | Mensagem principal |
| `botoes` | `BotaoModal[]` | `[]` | Array de botões |
| `isOpen` | `boolean` | `false` | Controla visibilidade |

## Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `modalFechado` | `EventEmitter<void>` | Modal foi fechado |
| `botaoClicado` | `EventEmitter<number>` | Índice do botão clicado |

## Interface BotaoModal

```typescript
interface BotaoModal {
  texto: string;
  cor?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  handler?: () => void;
}
```

## Exemplos de Uso

### Alerta Simples
```html
<app-modal-generic
  titulo="Atenção"
  mensagem="Operação realizada com sucesso!"
  [botoes]="[{ texto: 'OK' }]"
  [isOpen]="mostrarAlerta"
  (modalFechado)="mostrarAlerta = false">
</app-modal-generic>
```

### Confirmação
```html
<app-modal-generic
  titulo="Confirmar Exclusão"
  mensagem="Deseja realmente excluir este tópico?"
  [botoes]="botoesConfirmacao"
  [isOpen]="mostrarConfirmacao"
  (modalFechado)="mostrarConfirmacao = false"
  (botaoClicado)="processarResposta($event)">
</app-modal-generic>
```

```typescript
botoesConfirmacao: BotaoModal[] = [
  { texto: 'Cancelar', cor: 'medium' },
  { texto: 'Excluir', cor: 'danger' }
];

processarResposta(index: number): void {
  if (index === 1) {
    // Lógica de exclusão
  }
}
``` 