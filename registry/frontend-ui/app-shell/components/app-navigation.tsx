import type { ComponentType, ReactElement } from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export interface NavigationItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  // Sem endereço, o item aparece apagado, com "Em breve": a tela ainda não existe.
  href: string | null;
}

export interface NavigationGroup {
  id: string;
  label: string | null;
  items: NavigationItem[];
}

interface AppNavigationProps {
  groups: NavigationGroup[];
  currentPath: string;
  // O link do framework (o Link do Next, por exemplo) com o href; o padrão é um <a>.
  renderLink?: (href: string) => ReactElement;
}

// O item ativo numa faixa cinza, a do hover, sem barra: a marca fica só no ícone e no texto, que vai
// em negrito.
const ITEM_CLASS =
  'h-11 gap-3 px-4 font-medium [&_svg]:size-[18px] [&_svg]:opacity-80 data-active:bg-sidebar-accent data-active:font-bold data-active:text-brand-muted-foreground data-active:hover:bg-sidebar-accent data-active:hover:text-brand-muted-foreground data-active:[&_svg]:opacity-100';

function renderAnchor(href: string): ReactElement {
  return <a href={href} />;
}

function withoutTrailingSlash(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}

// O item fica marcado na página dele e nas de dentro: /patients/new marca Pacientes. A raiz, só nela.
export function isCurrentPath(href: string, currentPath: string): boolean {
  const itemPath = withoutTrailingSlash(href);
  const path = withoutTrailingSlash(currentPath);
  if (itemPath === '/') {
    return path === '/';
  }
  return path === itemPath || path.startsWith(`${itemPath}/`);
}

export function AppNavigation({
  groups,
  currentPath,
  renderLink = renderAnchor,
}: AppNavigationProps) {
  return (
    <nav aria-label="Menu principal" className="flex flex-col">
      {groups.map((group) => (
        <SidebarGroup key={group.id} className="py-1">
          {group.label !== null && (
            // O text-sidebar-foreground/70 do shadcn fica abaixo do AA sobre o menu claro.
            <SidebarGroupLabel className="px-4 text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            {/* A linha clara entre os itens e o passo de 49px são os do menu do Admin One. */}
            <SidebarMenu className="gap-0 *:border-b *:border-sidebar-border/50 *:py-0.5 *:last:border-b-0">
              {group.items.map((item) => (
                <NavigationEntry
                  key={item.id}
                  item={item}
                  currentPath={currentPath}
                  renderLink={renderLink}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </nav>
  );
}

interface NavigationEntryProps {
  item: NavigationItem;
  currentPath: string;
  renderLink: (href: string) => ReactElement;
}

function NavigationEntry({ item, currentPath, renderLink }: NavigationEntryProps) {
  const Icon = item.icon;

  if (item.href === null) {
    return (
      <SidebarMenuItem>
        {/* Sem tooltip: o TooltipTrigger do Base UI não repassa o disabled ao botão. */}
        {/* O "em breve" vai no nome do botão, e o selo fica fora da árvore de acessibilidade: o
            leitor de tela ouve "Profissionais, em breve" uma vez só. */}
        <SidebarMenuButton
          disabled
          aria-label={`${item.label}, em breve`}
          className={`${ITEM_CLASS} pr-20`}
        >
          <Icon />
          <span>{item.label}</span>
        </SidebarMenuButton>
        <SidebarMenuBadge
          aria-hidden="true"
          className="peer-data-[size=default]/menu-button:top-3 right-2 rounded-full bg-muted px-2 font-normal text-sidebar-foreground"
        >
          Em breve
        </SidebarMenuBadge>
      </SidebarMenuItem>
    );
  }

  const isActive = isCurrentPath(item.href, currentPath);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={item.label}
        aria-current={isActive && 'page'}
        render={renderLink(item.href)}
        className={ITEM_CLASS}
      >
        <Icon />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
