import path from 'path'
import test from 'ava'
import sao from 'sao'

const generator = path.join(__dirname, '..', 'src', 'generator')

test('defaults', async t => {
  const stream = await sao.mock({ generator })

  t.snapshot(stream.fileList, 'Generated files')
})
