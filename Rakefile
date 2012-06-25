# Build-related information:
require 'json'

TIMECOP_VERSION = '0.0.5'
PACKAGE_LOCATION = File.expand_path('../package.json', __FILE__)
output_path = File.expand_path("../timecop.js", __FILE__)
lib_dir = File.expand_path('../lib', __FILE__)
lib_files = [ 'Timecop', 'MockDate', 'TimeStackItem' ].map do |file|
  File.join(lib_dir, "#{file}.js")
end

# Tasks:

task :default => :build

desc "Delete all compiled version of the Timecop library"
task :clean do
  `rm timecop.js`
end

desc "compile, syntax-check, and test the Timecop library"
task :build => :test

desc "Run tests on the compiled Timecop library"
task :test => :lint do
  puts "No command-line tests yet."
end

desc "Run JSLint syntax checks on the compiled Timecop library"
task :lint => :bump_version do
  puts "No JSLint yet."
end

desc "Version bump the package.json file"
task :bump_version => output_path do
  package = JSON.parse(File.read(PACKAGE_LOCATION))

  if package["version"] == TIMECOP_VERSION
    puts("The version was not bumped")
  else
    package["version"] = TIMECOP_VERSION
    File.open(PACKAGE_LOCATION, 'w') {|f| f.write(JSON.pretty_generate(package)) }
    puts("Updated the version of package.json to #{TIMECOP_VERSION}")
  end
end

desc "compile the files in lib/ to timecop-{version}.js"
file output_path => lib_files do
  template = File.read(File.join(lib_dir, 'BuildTemplate.js'))

  contents = lib_files.
              map { |f| File.read(f) }.
              join("\n\n")

  compiled = template.
              sub('{{ TIMECOP_VERSION }}', TIMECOP_VERSION).
              sub('{{ TIMECOP_LIBRARIES }}', contents)

  File.open(output_path, 'w') { |f| f.write(compiled) }

  puts("Wrote #{output_path}")
end
