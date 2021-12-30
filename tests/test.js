import {Selector} from 'testcafe';

fixture('アンケートフォーム')
    .page('https://hotel.testplanisphere.dev/ja/reserve.html?plan-id=0');

test('必要項目を入力後、送信して遷移先を確認', async t => {
  const userName   = await Selector('#username');
  const contactSelect = await Selector('#contact');
  const contactOption = contactSelect.find('option');
  const submitButton = await Selector('#submit-button');
  await t
    .setNativeDialogHandler(() => true)
    .typeText(userName, 'テスト太郎')
    .click(contactSelect)
    .click(contactOption.withText('希望しない'))
    .click(submitButton);
  await t.expect(Selector('#total-bill').innerText).eql('合計 7,000円（税込み）');
});