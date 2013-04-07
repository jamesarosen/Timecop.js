require 'rake/tasklib'

module Timecop

  class CompilationTask < Rake::TaskLib

    attr_accessor :name, :source_files, :template, :version

    def initialize(name)
      @name         = name
      @source_files = []
      @template     = nil
      @version      = nil
      yield self if block_given?
      define
    end

    def define
      CLEAN << name

      out_dir = File.dirname(name)

      file name => [ *source_files, template, out_dir ] do
        template = File.read(self.template)

        contents = source_files.
                    map { |f| File.read(f) }.
                    join("\n\n")

        compiled = template.
                    sub('{{ TIMECOP_VERSION }}', version).
                    sub('{{ TIMECOP_LIBRARIES }}', contents)

        File.open(name, 'w') { |f| f.write(compiled) }

        puts("Wrote #{name}")
      end

      directory out_dir
    end

  end

end

Rake::DSL.class_eval do
  def compile(name, &block)
    Timecop::CompilationTask.new(name, &block)
  end
end
