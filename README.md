# Edna Moreira — Recordações em vídeo

Galeria estática em HTML, CSS e JavaScript, preparada para `https://coreilabs.github.io/videosedna/`.

## Atualizar o álbum

1. Adicione os vídeos em `gallery/` sem renomear os antigos: o nome original determina o identificador permanente do link.
2. Gere miniaturas com `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\generate-thumbnails.ps1`. Instalação do FFmpeg e opções no `AGENTS.md`.
3. Execute `node scripts/generate-catalog.cjs` para atualizar `videos.json`.
4. Publique os arquivos atualizados, incluindo `gallery/`, `thumbnails/` e `videos.json`.

As miniaturas são JPEG verticais 9:16 (360 × 640 px), com o quadro inteiro preservado. Vídeos horizontais recebem preenchimento escuro. Para substituir todas as capas existentes pelo formato atual, execute `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\generate-thumbnails.ps1 -Force`. Os cartões usam a mesma proporção no desktop e no celular, sem recortar as imagens.

O catálogo usa nomes neutros e numeração por ordem dos arquivos, pois os vídeos originais não possuem títulos descritivos. É possível editar os títulos em `videos.json`; uma nova geração do catálogo substitui essas edições. Os links usam o hash do nome do arquivo, independente do título e da ordem.

## Executar localmente

Execute `node scripts/serve.cjs` e abra `http://127.0.0.1:8766`. Este servidor local suporta requisições parciais (HTTP Range), necessárias para avançar e retroceder vídeos. O servidor embutido do PHP pode não permitir avançar vídeos. Abrir o HTML com `file://` não permite carregar o catálogo em alguns navegadores. O helper local não é necessário no GitHub Pages.

## GitHub Pages

Envie o projeto para o repositório `coreilabs/videosedna`. Em **Settings → Pages**, selecione publicação pela branch desejada, pasta **/(root)**. Não há build nem dependências de produção. O `.nojekyll` permite servir os arquivos diretamente. Caminhos relativos suportam o prefixo `/videosedna/`.

A publicação não foi executada por este projeto local. Respeite o limite de tamanho do Pages antes de enviar novos vídeos; o acervo atual está próximo de 1 GB. Os vídeos publicados e links são públicos: este álbum não possui autenticação.

## Imagem de compartilhamento

A imagem de compartilhamento está em `imgs/opengraph.webp`, com 1200 × 630 px. As tags Open Graph e Twitter apontam para esse arquivo no endereço definitivo. As redes exibem a mesma prévia geral para todos os links individuais; o parâmetro `?video=ID` seleciona o vídeo ao abrir a página.

## Reprodução e navegação

Um único elemento de vídeo atende todo o álbum. As capas usam lazy loading, com 24 cartões por lote. Um `IntersectionObserver` carrega o próximo lote automaticamente quando o fim da lista se aproxima (500 px de antecedência), sem mover o foco. O botão “Ver mais recordações” permanece como alternativa pelo teclado e para navegadores sem suporte ao observador. A busca reinicia a lista e o carregamento termina ao alcançar todos os resultados.

Os vídeos são carregados somente ao abrir o player, sem autoplay. Player com pausa, progresso, som, tela cheia nativa, anterior/próximo, swipe horizontal e animação respeitando redução de movimento. Tela cheia usa os controles nativos do navegador.

`accessibility.css` define fontes principais e botões de 18 px, textos introdutórios de 20 px, maior contraste e alvos de toque de pelo menos 56 px nos controles. O player possui rótulos visíveis e reorganiza os controles em telas menores, permitindo rolagem vertical no diálogo para acessar todas as ações.

Compartilhamento pelo sistema quando disponível, com cópia do link e campo selecionável como alternativas. O download aponta diretamente ao original no mesmo domínio; o comportamento de salvar depende do navegador, especialmente no iOS.
