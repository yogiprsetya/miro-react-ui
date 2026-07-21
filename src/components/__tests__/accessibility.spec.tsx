import { render } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

async function expectAccessible() {
  const results = await axe.run(document.body);
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
});
