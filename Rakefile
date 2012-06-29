# Build-related information:
require 'json'

TIMECOP_VERSION = '0.1.0'
project_root = File.expand_path(File.dirname(__FILE__))
package_location = File.join(project_root, 'package.json')
output_path = File.join(project_root, "timecop.js")
lib_dir = File.join(project_root, 'lib')

lib_files = [ 'Timecop', 'MockDate', 'TimeStackItem' ].map do |f|
  File.join(lib_dir, "#{f}.js")
end

# Tasks:

task :default => :build

desc "Delete all compiled version of the Timecop library"
task :clean do
  `rm timecop.js`
end

desc "compile, syntax-check, and test the Timecop library"
task :build => output_path

desc "Run tests on the compiled Timecop library"
task :test => 'jshint:check'  do
  sh "bundle exec jasmine-headless-webkit" do |ok, res|
    fail "Test failures" unless ok
  end
  puts "Tests passed"
end

namespace :jshint do
  task :require do
    sh "which jshint" do |ok, res|
      fail 'Cannot find jshint on $PATH' unless ok
    end
  end

  task :check => 'jshint:require' do
    config_file = File.join(project_root, '.jshintrc')
    sh "jshint #{lib_files.join(' ')} --config #{config_file}" do |ok, res|
      fail 'JSHint found errors in source.' unless ok
    end

    sh "jshint #{output_path} --config #{config_file}" do |ok, res|
      fail 'JSHint found errors in compiled output.' unless ok
    end

    puts "JSHint checks passed"
  end
end

desc "Version bump the package.json file"
task :bump_version => :test do
  package = JSON.parse(File.read(package_location))

  if package["version"] == TIMECOP_VERSION
    puts("The version was not bumped")
  else
    package["version"] = TIMECOP_VERSION
    File.open(package_location, 'w') {|f| f.write(JSON.pretty_generate(package)) }
    puts("Updated the version of package.json to #{TIMECOP_VERSION}")
  end
end

desc "compile the files in lib/ to timecop-{version}.js"
file output_path => :bump_version do
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
