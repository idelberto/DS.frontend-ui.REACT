import { Check, Mail, Phone, SquarePen, User, X } from 'lucide-react';
import type { Metadata } from 'next';

import { ShowcaseShell } from '@/components/showcase-shell';
import { Button } from '@/registry/frontend-ui/button/ui/button';
import {
  CardBox,
  CardBoxBody,
  CardBoxFooter,
  CardBoxHeader,
} from '@/registry/frontend-ui/card-box/components/card-box';
import { Checkbox } from '@/registry/frontend-ui/checkbox/ui/checkbox';
import { FileUpload } from '@/registry/frontend-ui/file-upload/components/file-upload';
import { FormField } from '@/registry/frontend-ui/form-field/components/form-field';
import { Input } from '@/registry/frontend-ui/input/ui/input';
import { InputIcon } from '@/registry/frontend-ui/input/ui/input-icon';
import { RadioGroup, RadioGroupItem } from '@/registry/frontend-ui/radio-group/ui/radio-group';
import { SectionMain } from '@/registry/frontend-ui/section-main/components/section-main';
import { SectionTitle } from '@/registry/frontend-ui/section-title/components/section-title';
import { Switch } from '@/registry/frontend-ui/switch/ui/switch';

export const metadata: Metadata = { title: 'Formulários' };

const REMINDERS = [
  { value: 'email', label: 'Lembrete por e-mail' },
  { value: 'sms', label: 'Lembrete por SMS' },
  { value: 'whatsapp', label: 'Lembrete por WhatsApp' },
] as const;

const PLANS = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'yearly', label: 'Anual' },
] as const;

export default function FormsPage() {
  return (
    <ShowcaseShell>
      <SectionMain>
        <SectionTitle icon={SquarePen} title="Formulários" />

        <CardBox>
          <CardBoxHeader title="Novo paciente" icon={User} />
          <CardBoxBody className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Nome">
                <InputIcon icon={User} name="name" placeholder="Nome completo" />
              </FormField>
              <FormField label="E-mail">
                <InputIcon icon={Mail} name="email" type="email" placeholder="nome@exemplo.com" />
              </FormField>
            </div>
            <FormField label="Telefone" description="Com DDD, só números.">
              <InputIcon icon={Phone} name="phone" inputMode="tel" placeholder="11987654321" />
            </FormField>
            <FormField label="CPF" error="CPF inválido: confira os 11 dígitos.">
              <Input name="cpf" defaultValue="123.456.789-00" />
            </FormField>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-2 font-bold">Lembretes</legend>
              {REMINDERS.map((reminder) => (
                <label key={reminder.value} className="flex items-center gap-2">
                  <Checkbox name="reminders" value={reminder.value} />
                  {reminder.label}
                </label>
              ))}
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-2 font-bold">Plano</legend>
              <RadioGroup name="plan" defaultValue="monthly">
                {PLANS.map((plan) => (
                  <label key={plan.value} className="flex items-center gap-2">
                    <RadioGroupItem value={plan.value} />
                    {plan.label}
                  </label>
                ))}
              </RadioGroup>
            </fieldset>

            <label className="flex items-center gap-3">
              <Switch name="notifications" defaultChecked />
              Receber avisos da clínica
            </label>

            <div className="flex flex-col gap-2">
              {/* Dois rótulos no mesmo input: o leitor de tela ouve "Foto, Escolher arquivo". */}
              <label htmlFor="photo" className="font-bold">
                Foto
              </label>
              <FileUpload id="photo" name="photo" accept="image/*" />
            </div>
          </CardBoxBody>
          <CardBoxFooter>
            <Button variant="outline">
              <X />
              Cancelar
            </Button>
            <Button type="submit">
              <Check />
              Salvar
            </Button>
          </CardBoxFooter>
        </CardBox>
      </SectionMain>
    </ShowcaseShell>
  );
}
