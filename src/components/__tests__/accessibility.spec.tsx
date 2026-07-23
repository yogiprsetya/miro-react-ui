import { render } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { Toaster } from '~/components/ui/sonner';

async function expectAccessible(options?: { allowPortalContent?: boolean }) {
  const results = await axe.run(document.body, {
    rules: options?.allowPortalContent
      ? { region: { enabled: false } }
      : undefined,
  });
  expect(results.violations).toEqual([]);
}

describe('representative accessibility states', () => {
  it('has no violations in the default state', async () => {
    render(
      <main>
        <h1>Workspace settings</h1>
        <Label htmlFor="workspace-name">Workspace name</Label>
        <Input id="workspace-name" />
        <Button type="button">Save changes</Button>
      </main>
    );

    await expectAccessible();
  });

  it('has no violations in the invalid state', async () => {
    render(
      <main>
        <h1>Workspace settings</h1>
        <Label htmlFor="workspace-name">Workspace name</Label>
        <Input
          id="workspace-name"
          aria-invalid="true"
          aria-describedby="workspace-error"
        />
        <p id="workspace-error">Workspace name is required.</p>
      </main>
    );

    await expectAccessible();
  });

  it('has no violations in the disabled state', async () => {
    render(
      <main>
        <h1>Workspace settings</h1>
        <Label htmlFor="workspace-name">Workspace name</Label>
        <Input id="workspace-name" disabled />
      </main>
    );

    await expectAccessible();
  });

  it('has no violations for a composite control', async () => {
    render(
      <main>
        <h1>Workspace settings</h1>
        <fieldset>
          <legend>Notifications</legend>
          <Checkbox aria-label="Email notifications" />
        </fieldset>
      </main>
    );

    await expectAccessible();
  });

  it('has no violations for select, radio group, and switch controls', async () => {
    render(
      <main>
        <h1>Notification preferences</h1>
        <Select defaultValue="daily">
          <SelectTrigger aria-label="Digest frequency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
        <RadioGroup defaultValue="email" aria-label="Delivery method">
          <RadioGroupItem value="email" aria-label="Email" />
          <RadioGroupItem value="push" aria-label="Push notification" />
        </RadioGroup>
        <Switch aria-label="Enable notifications" />
      </main>
    );

    await expectAccessible();
  });

  it('has no violations for an open select and visible tooltip', async () => {
    render(
      <main>
        <h1>Help and preferences</h1>
        <Select open defaultValue="daily">
          <SelectTrigger aria-label="Digest frequency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
        <TooltipProvider>
          <Tooltip open>
            <TooltipTrigger aria-label="More information">?</TooltipTrigger>
            <TooltipContent>Notification preferences help</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </main>
    );

    // Select and tooltip content render in Radix portals outside the landmark.
    await expectAccessible({ allowPortalContent: true });
  });

  it('has no violations for the toaster live region', async () => {
    render(
      <main>
        <h1>Notifications</h1>
        <Toaster />
      </main>
    );

    await expectAccessible();
  });
});
