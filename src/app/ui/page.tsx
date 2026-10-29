import {
  CircleAlert,
  CircleCheck,
  Info,
  LayoutTemplate,
  Plus,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import type { Metadata } from 'next';

import { ShowcaseShell } from '@/components/showcase-shell';
import { Button } from '@/registry/frontend-ui/button/ui/button';
import {
  CardBox,
  CardBoxBody,
  CardBoxHeader,
} from '@/registry/frontend-ui/card-box/components/card-box';
import { Modal, ModalClose } from '@/registry/frontend-ui/modal/components/modal';
import { NotificationBar } from '@/registry/frontend-ui/notification-bar/components/notification-bar';
import { PillTag } from '@/registry/frontend-ui/pill-tag/components/pill-tag';
import { SectionMain } from '@/registry/frontend-ui/section-main/components/section-main';
import { SectionTitle } from '@/registry/frontend-ui/section-title/components/section-title';

import { ToastDemo } from './toast-demo';

export const metadata: Metadata = { title: 'Interface' };

const BUTTON_VARIANTS = [
  { variant: 'default', label: 'Marca' },
  { variant: 'secondary', label: 'Secundário' },
  { variant: 'contrast', label: 'Contraste' },
  { variant: 'success', label: 'Sucesso' },
  { variant: 'warning', label: 'Alerta' },
  { variant: 'destructive', label: 'Perigo' },
  { variant: 'info', label: 'Informação' },
  { variant: 'outline', label: 'Contorno' },
  { variant: 'ghost', label: 'Fantasma' },
] as const;

const TONES = [
  { tone: 'brand', label: 'Marca' },
  { tone: 'success', label: 'Ativo' },
  { tone: 'warning', label: 'Pendente' },
  { tone: 'danger', label: 'Inativo' },
  { tone: 'info', label: 'Novo' },
  { tone: 'neutral', label: 'Arquivado' },
] as const;

export default function UiPage() {
  return (
    <ShowcaseShell>
      <SectionMain>
        <SectionTitle icon={LayoutTemplate} title="Interface" />

        <CardBox>
          <CardBoxHeader title="Botões" />
          <CardBoxBody className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {BUTTON_VARIANTS.map((button) => (
                <Button key={button.variant} variant={button.variant}>
                  {button.label}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {BUTTON_VARIANTS.map((button) => (
                <Button key={button.variant} variant={button.variant} shape="pill">
                  {button.label}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" shape="pill">
                <Plus />
                Novo
              </Button>
              <Button size="lg">Grande</Button>
              <Button variant="destructive" size="icon" aria-label="Excluir">
                <Trash2 />
              </Button>
              <Button disabled>Desabilitado</Button>
            </div>
          </CardBoxBody>
        </CardBox>

        <CardBox>
          <CardBoxHeader title="Selos" />
          <CardBoxBody className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {TONES.map((pill) => (
                <PillTag key={pill.tone} tone={pill.tone}>
                  {pill.label}
                </PillTag>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {TONES.map((pill) => (
                <PillTag key={pill.tone} tone={pill.tone} variant="soft" size="sm">
                  {pill.label}
                </PillTag>
              ))}
            </div>
          </CardBoxBody>
        </CardBox>

        <div className="flex flex-col gap-4">
          <NotificationBar tone="success" icon={<CircleCheck />}>
            <b>Pronto.</b> O paciente foi salvo.
          </NotificationBar>
          <NotificationBar tone="warning" icon={<TriangleAlert />}>
            <b>Atenção.</b> O período de teste termina hoje.
          </NotificationBar>
          <NotificationBar tone="danger" icon={<CircleAlert />}>
            <b>Erro.</b> Não deu para carregar a agenda.
          </NotificationBar>
          <NotificationBar
            tone="info"
            icon={<Info />}
            action={
              <Button variant="secondary" size="sm" shape="pill">
                Ver novidades
              </Button>
            }
          >
            <b>Novidade.</b> A agenda agora mostra os atendimentos da semana.
          </NotificationBar>
        </div>

        <CardBox>
          <CardBoxHeader title="Modal e toast" />
          <CardBoxBody className="flex flex-col gap-4">
            <Modal
              title="Excluir paciente?"
              trigger={
                <Button variant="destructive" className="self-start">
                  Excluir paciente
                </Button>
              }
              footer={
                <>
                  <ModalClose render={<Button variant="destructive" />}>Excluir</ModalClose>
                  <ModalClose render={<Button variant="outline" />}>Cancelar</ModalClose>
                </>
              }
            >
              <p>Ana Carolina Silva Santos sai da lista de pacientes.</p>
              <p className="text-muted-foreground">
                O histórico de atendimentos continua guardado.
              </p>
            </Modal>
            <ToastDemo />
          </CardBoxBody>
        </CardBox>
      </SectionMain>
    </ShowcaseShell>
  );
}
