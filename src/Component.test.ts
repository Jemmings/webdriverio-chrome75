import {$, expect} from '@wdio/globals'
import {createTestsServer, stopTestsServer} from './test-server';

describe('WebdriverIO Chrome 75 Test', () => {
  it('should be able to retrieve iframe and fill input element', async (): Promise<void> => {
    // Start the tests server.
    createTestsServer();

    // Load the test page.
    await browser.url(`http://localhost:8080/test-page.html`);

    // Move in to the iframe.
    await $('[data-testid="test-iframe"]').waitForExist();
    const testIframe = await $('[data-testid="test-iframe"]');
    await browser.switchFrame(testIframe);

    // Add a value to the input in the iframe.
    await $('[data-testid="client-input"]').waitForExist();
    const inputElement = await $('[data-testid="client-input"]');
    await inputElement.addValue('123456789');

    // Get the value.
    const value = await inputElement.getValue();
    expect(value).toEqual('123456789');

    await browser.pause(1000);

    // Close the test server.
    stopTestsServer();
  })
})
