# HeaderComponent

Componente de cabeçalho reutilizável para todas as páginas do FeynQuizz.

## Funcionalidades

- Título configurável
- Botão de voltar opcional
- Botão de configuração opcional
- Responsivo para mobile
- Compatível com temas iOS/Android
- Eventos customizáveis

## Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `title` | `string` | `''` | Título exibido no cabeçalho |
| `canGoBack` | `boolean` | `false` | Mostra botão de voltar |
| `showConfig` | `boolean` | `false` | Mostra botão de configuração |

## Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `voltarClicado` | `EventEmitter<void>` | Emitido ao clicar no botão voltar |
| `configClicado` | `EventEmitter<void>` | Emitido ao clicar no botão configuração |

## Exemplos de Uso

### Cabeçalho Simples
```html
<app-header title="FeynQuizz"></app-header>
```

### Com Botão de Voltar
```html
<app-header 
  title="Detalhes do Tópico" 
  [canGoBack]="true">
</app-header>
```

### Com Configuração
```html
<app-header 
  title="Home" 
  [showConfig]="true">
</app-header>
```

### Com Eventos Customizados
```html
<app-header 
  title="Quiz" 
  [canGoBack]="true"
  (voltarClicado)="confirmarSaida()">
</app-header>
```

```typescript
confirmarSaida(): void {
  // Lógica customizada antes de voltar
  // Se não implementada, usa navegação padrão
}
```

## Características Técnicas

- **Standalone Component**: Pode ser importado diretamente
- **OnPush Change Detection**: Otimização de performance
- **Injeção Moderna**: Usa `inject()` do Angular 16+
- **Acessibilidade**: Labels ARIA apropriados
- **Mobile-First**: Áreas de toque adequadas (44px+)
- **Navegação Automática**: Comportamento padrão se não houver handlers customizados 